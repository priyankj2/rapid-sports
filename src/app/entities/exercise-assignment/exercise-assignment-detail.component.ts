import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IExerciseAssignment } from 'app/shared/model/exercise-assignment.model';

@Component({
  selector: 'jhi-exercise-assignment-detail',
  templateUrl: './exercise-assignment-detail.component.html'
})
export class ExerciseAssignmentDetailComponent implements OnInit {
  exerciseAssignment: IExerciseAssignment | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ exerciseAssignment }) => (this.exerciseAssignment = exerciseAssignment));
  }

  previousState(): void {
    window.history.back();
  }
}
