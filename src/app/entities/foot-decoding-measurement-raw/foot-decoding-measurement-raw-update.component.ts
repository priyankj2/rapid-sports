import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IFootDecodingMeasurementRaw, FootDecodingMeasurementRaw } from 'app/shared/model/foot-decoding-measurement-raw.model';
import { FootDecodingMeasurementRawService } from './foot-decoding-measurement-raw.service';

@Component({
  selector: 'jhi-foot-decoding-measurement-raw-update',
  templateUrl: './foot-decoding-measurement-raw-update.component.html'
})
export class FootDecodingMeasurementRawUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    rawData: [null, [Validators.required]]
  });

  constructor(
    protected footDecodingMeasurementRawService: FootDecodingMeasurementRawService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ footDecodingMeasurementRaw }) => {
      this.updateForm(footDecodingMeasurementRaw);
    });
  }

  updateForm(footDecodingMeasurementRaw: IFootDecodingMeasurementRaw): void {
    this.editForm.patchValue({
      id: footDecodingMeasurementRaw.id,
      rawData: footDecodingMeasurementRaw.rawData
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const footDecodingMeasurementRaw = this.createFromForm();
    if (footDecodingMeasurementRaw.id !== undefined) {
      this.subscribeToSaveResponse(this.footDecodingMeasurementRawService.update(footDecodingMeasurementRaw));
    } else {
      this.subscribeToSaveResponse(this.footDecodingMeasurementRawService.create(footDecodingMeasurementRaw));
    }
  }

  private createFromForm(): IFootDecodingMeasurementRaw {
    return {
      ...new FootDecodingMeasurementRaw(),
      id: this.editForm.get(['id'])!.value,
      rawData: this.editForm.get(['rawData'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFootDecodingMeasurementRaw>>): void {
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
