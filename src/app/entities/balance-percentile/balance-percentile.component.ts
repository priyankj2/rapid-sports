import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IBalancePercentile } from 'app/shared/model/balance-percentile.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { BalancePercentileService } from './balance-percentile.service';
import { BalancePercentileDeleteDialogComponent } from './balance-percentile-delete-dialog.component';

@Component({
  selector: 'jhi-balance-percentile',
  templateUrl: './balance-percentile.component.html'
})
export class BalancePercentileComponent implements OnInit, OnDestroy {
  balancePercentiles?: IBalancePercentile[];
  eventSubscriber?: Subscription;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;

  constructor(
    protected balancePercentileService: BalancePercentileService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadPage(page?: number): void {
    const pageToLoad: number = page || this.page;

    this.balancePercentileService
      .query({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe(
        (res: HttpResponse<IBalancePercentile[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
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
    this.registerChangeInBalancePercentiles();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IBalancePercentile): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInBalancePercentiles(): void {
    this.eventSubscriber = this.eventManager.subscribe('balancePercentileListModification', () => this.loadPage());
  }

  delete(balancePercentile: IBalancePercentile): void {
    const modalRef = this.modalService.open(BalancePercentileDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.balancePercentile = balancePercentile;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected onSuccess(data: IBalancePercentile[] | null, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.router.navigate(['/balance-percentile'], {
      queryParams: {
        page: this.page,
        size: this.itemsPerPage,
        sort: this.predicate + ',' + (this.ascending ? 'asc' : 'desc')
      }
    });
    this.balancePercentiles = data || [];
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page;
  }
}
