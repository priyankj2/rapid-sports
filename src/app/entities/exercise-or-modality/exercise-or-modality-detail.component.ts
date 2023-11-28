import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IExerciseOrModality } from 'app/shared/model/exercise-or-modality.model';

@Component({
  selector: 'jhi-exercise-or-modality-detail',
  templateUrl: './exercise-or-modality-detail.component.html'
})
export class ExerciseOrModalityDetailComponent implements OnInit {
  exerciseOrModality: IExerciseOrModality | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ exerciseOrModality }) => (this.exerciseOrModality = exerciseOrModality));
  }

  previousState(): void {
    window.history.back();
  }
}
