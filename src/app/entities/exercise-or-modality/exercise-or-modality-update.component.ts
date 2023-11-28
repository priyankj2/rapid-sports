import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IExerciseOrModality, ExerciseOrModality } from 'app/shared/model/exercise-or-modality.model';
import { ExerciseOrModalityService } from './exercise-or-modality.service';
import { IAssessment } from 'app/shared/model/assessment.model';
import { AssessmentService } from 'app/entities/assessment/assessment.service';

@Component({
  selector: 'jhi-exercise-or-modality-update',
  templateUrl: './exercise-or-modality-update.component.html'
})
export class ExerciseOrModalityUpdateComponent implements OnInit {
  isSaving = false;
  assessments: IAssessment[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    description: [null, [Validators.maxLength(2000)]],
    hasSets: [],
    hasReps: [],
    hasHoldTime: [],
    hasResistance: [],
    hasDays: [],
    defaultSets: [],
    defaultReps: [],
    defaultHoldTime: [],
    defaultResistance: [],
    defaultDays: [],
    currentSuccessRate: [],
    assessment: []
  });

  constructor(
    protected exerciseOrModalityService: ExerciseOrModalityService,
    protected assessmentService: AssessmentService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ exerciseOrModality }) => {
      this.updateForm(exerciseOrModality);

      this.assessmentService.query().subscribe((res: HttpResponse<IAssessment[]>) => (this.assessments = res.body || []));
    });
  }

  updateForm(exerciseOrModality: IExerciseOrModality): void {
    this.editForm.patchValue({
      id: exerciseOrModality.id,
      name: exerciseOrModality.name,
      description: exerciseOrModality.description,
      hasSets: exerciseOrModality.hasSets,
      hasReps: exerciseOrModality.hasReps,
      hasHoldTime: exerciseOrModality.hasHoldTime,
      hasResistance: exerciseOrModality.hasResistance,
      hasDays: exerciseOrModality.hasDays,
      defaultSets: exerciseOrModality.defaultSets,
      defaultReps: exerciseOrModality.defaultReps,
      defaultHoldTime: exerciseOrModality.defaultHoldTime,
      defaultResistance: exerciseOrModality.defaultResistance,
      defaultDays: exerciseOrModality.defaultDays,
      currentSuccessRate: exerciseOrModality.currentSuccessRate,
      assessment: exerciseOrModality.assessment
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const exerciseOrModality = this.createFromForm();
    if (exerciseOrModality.id !== undefined) {
      this.subscribeToSaveResponse(this.exerciseOrModalityService.update(exerciseOrModality));
    } else {
      this.subscribeToSaveResponse(this.exerciseOrModalityService.create(exerciseOrModality));
    }
  }

  private createFromForm(): IExerciseOrModality {
    return {
      ...new ExerciseOrModality(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      description: this.editForm.get(['description'])!.value,
      hasSets: this.editForm.get(['hasSets'])!.value,
      hasReps: this.editForm.get(['hasReps'])!.value,
      hasHoldTime: this.editForm.get(['hasHoldTime'])!.value,
      hasResistance: this.editForm.get(['hasResistance'])!.value,
      hasDays: this.editForm.get(['hasDays'])!.value,
      defaultSets: this.editForm.get(['defaultSets'])!.value,
      defaultReps: this.editForm.get(['defaultReps'])!.value,
      defaultHoldTime: this.editForm.get(['defaultHoldTime'])!.value,
      defaultResistance: this.editForm.get(['defaultResistance'])!.value,
      defaultDays: this.editForm.get(['defaultDays'])!.value,
      currentSuccessRate: this.editForm.get(['currentSuccessRate'])!.value,
      assessment: this.editForm.get(['assessment'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IExerciseOrModality>>): void {
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

  trackById(index: number, item: IAssessment): any {
    return item.id;
  }
}
