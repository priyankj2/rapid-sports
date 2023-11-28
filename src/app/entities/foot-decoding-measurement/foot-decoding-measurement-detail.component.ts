import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFootDecodingMeasurement } from 'app/shared/model/foot-decoding-measurement.model';

@Component({
  selector: 'jhi-foot-decoding-measurement-detail',
  templateUrl: './foot-decoding-measurement-detail.component.html'
})
export class FootDecodingMeasurementDetailComponent implements OnInit {
  footDecodingMeasurement: IFootDecodingMeasurement | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ footDecodingMeasurement }) => (this.footDecodingMeasurement = footDecodingMeasurement));
  }

  previousState(): void {
    window.history.back();
  }
}
