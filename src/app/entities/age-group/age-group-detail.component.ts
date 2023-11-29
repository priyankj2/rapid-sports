import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IAgeGroup } from '../../shared/model/age-group.model';


@Component({
  selector: 'jhi-age-group-detail',
  templateUrl: './age-group-detail.component.html'
})
export class AgeGroupDetailComponent implements OnInit {
  ageGroup: IAgeGroup | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ageGroup }) => (this.ageGroup = ageGroup));
  }

  previousState(): void {
    window.history.back();
  }
}
