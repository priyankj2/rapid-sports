import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { AgeGroupService } from './age-group.service';
import { IAgeGroup, AgeGroup } from '../../shared/model/age-group.model';

@Component({
  selector: 'jhi-age-group-update',
  templateUrl: './age-group-update.component.html'
})
export class AgeGroupUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    minimumAge: [null, [Validators.required]],
    maximumAge: [null, [Validators.required]]
  });

  constructor(protected ageGroupService: AgeGroupService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ ageGroup }) => {
      this.updateForm(ageGroup);
    });
  }

  updateForm(ageGroup: IAgeGroup): void {
    this.editForm.patchValue({
      id: ageGroup.id,
      minimumAge: ageGroup.minimumAge,
      maximumAge: ageGroup.maximumAge
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const ageGroup = this.createFromForm();
    if (ageGroup.id !== undefined) {
      this.subscribeToSaveResponse(this.ageGroupService.update(ageGroup));
    } else {
      this.subscribeToSaveResponse(this.ageGroupService.create(ageGroup));
    }
  }

  private createFromForm(): IAgeGroup {
    return {
      ...new AgeGroup(),
      id: this.editForm.get(['id'])!.value,
      minimumAge: this.editForm.get(['minimumAge'])!.value,
      maximumAge: this.editForm.get(['maximumAge'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAgeGroup>>): void {
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
