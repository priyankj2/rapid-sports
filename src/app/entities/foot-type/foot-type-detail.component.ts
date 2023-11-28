import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFootType } from 'app/shared/model/foot-type.model';

@Component({
  selector: 'jhi-foot-type-detail',
  templateUrl: './foot-type-detail.component.html'
})
export class FootTypeDetailComponent implements OnInit {
  footType: IFootType | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ footType }) => (this.footType = footType));
  }

  previousState(): void {
    window.history.back();
  }
}
