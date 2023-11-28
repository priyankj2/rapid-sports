import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFallRiskRange } from 'app/shared/model/fall-risk-range.model';

@Component({
  selector: 'jhi-fall-risk-range-detail',
  templateUrl: './fall-risk-range-detail.component.html'
})
export class FallRiskRangeDetailComponent implements OnInit {
  fallRiskRange: IFallRiskRange | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ fallRiskRange }) => (this.fallRiskRange = fallRiskRange));
  }

  previousState(): void {
    window.history.back();
  }
}
