import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IBalancePercentile } from '../../shared/model/balance-percentile.model';


@Component({
  selector: 'jhi-balance-percentile-detail',
  templateUrl: './balance-percentile-detail.component.html'
})
export class BalancePercentileDetailComponent implements OnInit {
  balancePercentile: IBalancePercentile | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ balancePercentile }) => (this.balancePercentile = balancePercentile));
  }

  previousState(): void {
    window.history.back();
  }
}
