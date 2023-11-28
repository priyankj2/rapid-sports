import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IObservation, Observation } from 'app/shared/model/observation.model';
import { ObservationService } from './observation.service';

@Component({
  selector: 'jhi-observation-update',
  templateUrl: './observation-update.component.html'
})
export class ObservationUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    description: [null, [Validators.maxLength(2000)]],
    instructionalText: [],
    exampleImageUrl: [],
    internalCode: [],
    observationDuration: [],
    enabled: [],
    displayOrder: [],
    category: [],
    focusStageNumber: [],
    stageCount: [],
    visible: []
  });

  constructor(protected observationService: ObservationService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ observation }) => {
      this.updateForm(observation);
    });
  }

  updateForm(observation: IObservation): void {
    this.editForm.patchValue({
      id: observation.id,
      name: observation.name,
      description: observation.description,
      instructionalText: observation.instructionalText,
      exampleImageUrl: observation.exampleImageUrl,
      internalCode: observation.internalCode,
      observationDuration: observation.observationDuration,
      enabled: observation.enabled,
      displayOrder: observation.displayOrder,
      category: observation.category,
      focusStageNumber: observation.focusStageNumber,
      stageCount: observation.stageCount,
      visible: observation.visible
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const observation = this.createFromForm();
    if (observation.id !== undefined) {
      this.subscribeToSaveResponse(this.observationService.update(observation));
    } else {
      this.subscribeToSaveResponse(this.observationService.create(observation));
    }
  }

  private createFromForm(): IObservation {
    return {
      ...new Observation(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      description: this.editForm.get(['description'])!.value,
      instructionalText: this.editForm.get(['instructionalText'])!.value,
      exampleImageUrl: this.editForm.get(['exampleImageUrl'])!.value,
      internalCode: this.editForm.get(['internalCode'])!.value,
      observationDuration: this.editForm.get(['observationDuration'])!.value,
      enabled: this.editForm.get(['enabled'])!.value,
      displayOrder: this.editForm.get(['displayOrder'])!.value,
      category: this.editForm.get(['category'])!.value,
      focusStageNumber: this.editForm.get(['focusStageNumber'])!.value,
      stageCount: this.editForm.get(['stageCount'])!.value,
      visible: this.editForm.get(['visible'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IObservation>>): void {
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
}
