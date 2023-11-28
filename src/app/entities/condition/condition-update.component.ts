import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ICondition, Condition } from 'app/shared/model/condition.model';
import { ConditionService } from './condition.service';

@Component({
  selector: 'jhi-condition-update',
  templateUrl: './condition-update.component.html'
})
export class ConditionUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    primaryArea: [],
    description: [null, [Validators.maxLength(2000)]],
    enabled: [],
    displayOrder: []
  });

  constructor(protected conditionService: ConditionService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ condition }) => {
      this.updateForm(condition);
    });
  }

  updateForm(condition: ICondition): void {
    this.editForm.patchValue({
      id: condition.id,
      name: condition.name,
      primaryArea: condition.primaryArea,
      description: condition.description,
      enabled: condition.enabled,
      displayOrder: condition.displayOrder
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const condition = this.createFromForm();
    if (condition.id !== undefined) {
      this.subscribeToSaveResponse(this.conditionService.update(condition));
    } else {
      this.subscribeToSaveResponse(this.conditionService.create(condition));
    }
  }

  private createFromForm(): ICondition {
    return {
      ...new Condition(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      primaryArea: this.editForm.get(['primaryArea'])!.value,
      description: this.editForm.get(['description'])!.value,
      enabled: this.editForm.get(['enabled'])!.value,
      displayOrder: this.editForm.get(['displayOrder'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICondition>>): void {
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
