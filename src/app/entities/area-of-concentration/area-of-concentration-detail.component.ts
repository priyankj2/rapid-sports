import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IAreaOfConcentration } from '../../shared/model/area-of-concentration.model';


@Component({
  selector: 'jhi-area-of-concentration-detail',
  templateUrl: './area-of-concentration-detail.component.html'
})
export class AreaOfConcentrationDetailComponent implements OnInit {
  areaOfConcentration: IAreaOfConcentration | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ areaOfConcentration }) => (this.areaOfConcentration = areaOfConcentration));
  }

  previousState(): void {
    window.history.back();
  }
}
