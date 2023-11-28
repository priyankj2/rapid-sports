import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ExerciseAssignment, IExerciseAssignment } from 'app/shared/model/exercise-assignment.model';
import { ExerciseAssignmentService } from './exercise-assignment.service';
import { IExerciseOrModality } from 'app/shared/model/exercise-or-modality.model';
import { ExerciseOrModalityService } from 'app/entities/exercise-or-modality/exercise-or-modality.service';
import { IPatientCourseOfAction } from 'app/shared/model/patient-course-of-action.model';
import { PatientCourseOfActionService } from 'app/entities/patient-course-of-action/patient-course-of-action.service';

type SelectableEntity = IExerciseOrModality | IPatientCourseOfAction;

@Component({
  selector: 'jhi-exercise-assignment-update',
  templateUrl: './exercise-assignment-update.component.html'
})
export class ExerciseAssignmentUpdateComponent implements OnInit {
  isSaving = false;
  exerciseormodalities: IExerciseOrModality[] = [];
  patientcourseofactions: IPatientCourseOfAction[] = [];

  editForm = this.fb.group({
    id: [],
    sets: [],
    reps: [],
    holdTime: [],
    resistance: [],
    days: [],
    custom: [],
    exerciseOrModality: [],
    patientCourseOfAction: []
  });

  constructor(
    protected exerciseAssignmentService: ExerciseAssignmentService,
    protected exerciseOrModalityService: ExerciseOrModalityService,
    protected patientCourseOfActionService: PatientCourseOfActionService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ exerciseAssignment }) => {
      this.updateForm(exerciseAssignment);

      this.exerciseOrModalityService
        .query()
        .subscribe((res: HttpResponse<IExerciseOrModality[]>) => (this.exerciseormodalities = res.body || []));

      this.patientCourseOfActionService
        .query()
        .subscribe((res: HttpResponse<IPatientCourseOfAction[]>) => (this.patientcourseofactions = res.body || []));
    });
  }

  updateForm(exerciseAssignment: IExerciseAssignment): void {
    this.editForm.patchValue({
      id: exerciseAssignment.id,
      sets: exerciseAssignment.sets,
      reps: exerciseAssignment.reps,
      holdTime: exerciseAssignment.holdTime,
      resistance: exerciseAssignment.resistance,
      days: exerciseAssignment.days,
      custom: exerciseAssignment.custom,
      exerciseOrModality: exerciseAssignment.exerciseOrModality,
      patientCourseOfAction: exerciseAssignment.patientCourseOfAction
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const exerciseAssignment = this.createFromForm();
    if (exerciseAssignment.id !== undefined) {
      this.subscribeToSaveResponse(this.exerciseAssignmentService.update(exerciseAssignment));
    } else {
      this.subscribeToSaveResponse(this.exerciseAssignmentService.create(exerciseAssignment));
    }
  }

  private createFromForm(): IExerciseAssignment {
    return {
      ...new ExerciseAssignment(),
      id: this.editForm.get(['id'])!.value,
      sets: this.editForm.get(['sets'])!.value,
      reps: this.editForm.get(['reps'])!.value,
      holdTime: this.editForm.get(['holdTime'])!.value,
      resistance: this.editForm.get(['resistance'])!.value,
      days: this.editForm.get(['days'])!.value,
      custom: this.editForm.get(['custom'])!.value,
      exerciseOrModality: this.editForm.get(['exerciseOrModality'])!.value,
      patientCourseOfAction: this.editForm.get(['patientCourseOfAction'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IExerciseAssignment>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
