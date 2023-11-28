import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IStateOrProvince, StateOrProvince } from 'app/shared/model/state-or-province.model';
import { StateOrProvinceService } from './state-or-province.service';

@Component({
  selector: 'jhi-state-or-province-update',
  templateUrl: './state-or-province-update.component.html'
})
export class StateOrProvinceUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    abbreviation: [null, [Validators.required]]
  });

  constructor(
    protected stateOrProvinceService: StateOrProvinceService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ stateOrProvince }) => {
      this.updateForm(stateOrProvince);
    });
  }

  updateForm(stateOrProvince: IStateOrProvince): void {
    this.editForm.patchValue({
      id: stateOrProvince.id,
      name: stateOrProvince.name,
      abbreviation: stateOrProvince.abbreviation
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const stateOrProvince = this.createFromForm();
    if (stateOrProvince.id !== undefined) {
      this.subscribeToSaveResponse(this.stateOrProvinceService.update(stateOrProvince));
    } else {
      this.subscribeToSaveResponse(this.stateOrProvinceService.create(stateOrProvince));
    }
  }

  private createFromForm(): IStateOrProvince {
    return {
      ...new StateOrProvince(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      abbreviation: this.editForm.get(['abbreviation'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IStateOrProvince>>): void {
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
