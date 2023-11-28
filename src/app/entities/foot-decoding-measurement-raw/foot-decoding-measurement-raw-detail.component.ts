import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFootDecodingMeasurementRaw } from 'app/shared/model/foot-decoding-measurement-raw.model';

@Component({
  selector: 'jhi-foot-decoding-measurement-raw-detail',
  templateUrl: './foot-decoding-measurement-raw-detail.component.html'
})
export class FootDecodingMeasurementRawDetailComponent implements OnInit {
  footDecodingMeasurementRaw: IFootDecodingMeasurementRaw | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ footDecodingMeasurementRaw }) => (this.footDecodingMeasurementRaw = footDecodingMeasurementRaw));
  }

  previousState(): void {
    window.history.back();
  }
}
