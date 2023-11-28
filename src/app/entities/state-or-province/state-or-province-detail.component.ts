import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IStateOrProvince } from 'app/shared/model/state-or-province.model';

@Component({
  selector: 'jhi-state-or-province-detail',
  templateUrl: './state-or-province-detail.component.html'
})
export class StateOrProvinceDetailComponent implements OnInit {
  stateOrProvince: IStateOrProvince | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ stateOrProvince }) => (this.stateOrProvince = stateOrProvince));
  }

  previousState(): void {
    window.history.back();
  }
}
