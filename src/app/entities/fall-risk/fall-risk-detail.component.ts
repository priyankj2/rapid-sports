import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFallRisk } from 'app/shared/model/fall-risk.model';

@Component({
  selector: 'jhi-fall-risk-detail',
  templateUrl: './fall-risk-detail.component.html'
})
export class FallRiskDetailComponent implements OnInit {
  fallRisk: IFallRisk | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ fallRisk }) => (this.fallRisk = fallRisk));
  }

  previousState(): void {
    window.history.back();
  }
}
