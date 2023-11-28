import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICourseOfActionMapping } from 'app/shared/model/course-of-action-mapping.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { CourseOfActionMappingService } from './course-of-action-mapping.service';
import { CourseOfActionMappingDeleteDialogComponent } from './course-of-action-mapping-delete-dialog.component';

@Component({
  selector: 'jhi-course-of-action-mapping',
  templateUrl: './course-of-action-mapping.component.html'
})
export class CourseOfActionMappingComponent implements OnInit, OnDestroy {
  courseOfActionMappings?: ICourseOfActionMapping[];
  eventSubscriber?: Subscription;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;

  constructor(
    protected courseOfActionMappingService: CourseOfActionMappingService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadPage(page?: number): void {
    const pageToLoad: number = page || this.page;

    this.courseOfActionMappingService
      .query({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe(
        (res: HttpResponse<ICourseOfActionMapping[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
        () => this.onError()
      );
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.page = data.pagingParams.page;
      this.ascending = data.pagingParams.ascending;
      this.predicate = data.pagingParams.predicate;
      this.ngbPaginationPage = data.pagingParams.page;
      this.loadPage();
    });
    this.registerChangeInCourseOfActionMappings();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICourseOfActionMapping): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInCourseOfActionMappings(): void {
    this.eventSubscriber = this.eventManager.subscribe('courseOfActionMappingListModification', () => this.loadPage());
  }

  delete(courseOfActionMapping: ICourseOfActionMapping): void {
    const modalRef = this.modalService.open(CourseOfActionMappingDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.courseOfActionMapping = courseOfActionMapping;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected onSuccess(data: ICourseOfActionMapping[] | null, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.router.navigate(['/course-of-action-mapping'], {
      queryParams: {
        page: this.page,
        size: this.itemsPerPage,
        sort: this.predicate + ',' + (this.ascending ? 'asc' : 'desc')
      }
    });
    this.courseOfActionMappings = data || [];
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page;
  }
}
