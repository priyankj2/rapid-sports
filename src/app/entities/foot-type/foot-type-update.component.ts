import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IFootType, FootType } from 'app/shared/model/foot-type.model';
import { FootTypeService } from './foot-type.service';

@Component({
  selector: 'jhi-foot-type-update',
  templateUrl: './foot-type-update.component.html'
})
export class FootTypeUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    description: [null, [Validators.maxLength(2000)]],
    leftFront: [],
    leftHeel: [],
    rightFront: [],
    rightHeel: [],
    leftFootDescription: [],
    rightFootDescription: [],
    forefootMedial: [],
    forefootLateral: [],
    midfootMedial: [],
    midfootLateral: [],
    rearfootMedial: [],
    rearfootLateral: [],
    orthoCondition: [null, [Validators.maxLength(2000)]]
  });

  constructor(protected footTypeService: FootTypeService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ footType }) => {
      this.updateForm(footType);
    });
  }

  updateForm(footType: IFootType): void {
    this.editForm.patchValue({
      id: footType.id,
      name: footType.name,
      description: footType.description,
      leftFront: footType.leftFront,
      leftHeel: footType.leftHeel,
      rightFront: footType.rightFront,
      rightHeel: footType.rightHeel,
      leftFootDescription: footType.leftFootDescription,
      rightFootDescription: footType.rightFootDescription,
      forefootMedial: footType.forefootMedial,
      forefootLateral: footType.forefootLateral,
      midfootMedial: footType.midfootMedial,
      midfootLateral: footType.midfootLateral,
      rearfootMedial: footType.rearfootMedial,
      rearfootLateral: footType.rearfootLateral,
      orthoCondition: footType.orthoCondition
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const footType = this.createFromForm();
    if (footType.id !== undefined) {
      this.subscribeToSaveResponse(this.footTypeService.update(footType));
    } else {
      this.subscribeToSaveResponse(this.footTypeService.create(footType));
    }
  }

  private createFromForm(): IFootType {
    return {
      ...new FootType(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      description: this.editForm.get(['description'])!.value,
      leftFront: this.editForm.get(['leftFront'])!.value,
      leftHeel: this.editForm.get(['leftHeel'])!.value,
      rightFront: this.editForm.get(['rightFront'])!.value,
      rightHeel: this.editForm.get(['rightHeel'])!.value,
      leftFootDescription: this.editForm.get(['leftFootDescription'])!.value,
      rightFootDescription: this.editForm.get(['rightFootDescription'])!.value,
      forefootMedial: this.editForm.get(['forefootMedial'])!.value,
      forefootLateral: this.editForm.get(['forefootLateral'])!.value,
      midfootMedial: this.editForm.get(['midfootMedial'])!.value,
      midfootLateral: this.editForm.get(['midfootLateral'])!.value,
      rearfootMedial: this.editForm.get(['rearfootMedial'])!.value,
      rearfootLateral: this.editForm.get(['rearfootLateral'])!.value,
      orthoCondition: this.editForm.get(['orthoCondition'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFootType>>): void {
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
