import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IFallRisk } from 'app/shared/model/fall-risk.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { FallRiskService } from './fall-risk.service';
import { FallRiskDeleteDialogComponent } from './fall-risk-delete-dialog.component';

@Component({
  selector: 'jhi-fall-risk',
  templateUrl: './fall-risk.component.html'
})
export class FallRiskComponent implements OnInit, OnDestroy {
  fallRisks?: IFallRisk[];
  eventSubscriber?: Subscription;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;

  constructor(
    protected fallRiskService: FallRiskService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadPage(page?: number): void {
    const pageToLoad: number = page || this.page;

    this.fallRiskService
      .query({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe(
        (res: HttpResponse<IFallRisk[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
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
    this.registerChangeInFallRisks();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IFallRisk): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInFallRisks(): void {
    this.eventSubscriber = this.eventManager.subscribe('fallRiskListModification', () => this.loadPage());
  }

  delete(fallRisk: IFallRisk): void {
    const modalRef = this.modalService.open(FallRiskDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.fallRisk = fallRisk;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected onSuccess(data: IFallRisk[] | null, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.router.navigate(['/fall-risk'], {
      queryParams: {
        page: this.page,
        size: this.itemsPerPage,
        sort: this.predicate + ',' + (this.ascending ? 'asc' : 'desc')
      }
    });
    this.fallRisks = data || [];
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page;
  }
}
