import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IFootDecodingMeasurement, FootDecodingMeasurement } from 'app/shared/model/foot-decoding-measurement.model';
import { FootDecodingMeasurementService } from './foot-decoding-measurement.service';
import { IFootDecodingMeasurementRaw } from 'app/shared/model/foot-decoding-measurement-raw.model';
import { FootDecodingMeasurementRawService } from 'app/entities/foot-decoding-measurement-raw/foot-decoding-measurement-raw.service';

@Component({
  selector: 'jhi-foot-decoding-measurement-update',
  templateUrl: './foot-decoding-measurement-update.component.html'
})
export class FootDecodingMeasurementUpdateComponent implements OnInit {
  isSaving = false;
  footdecodingmeasurementraws: IFootDecodingMeasurementRaw[] = [];

  editForm = this.fb.group({
    id: [],
    leftFront: [],
    leftHeel: [],
    rightFront: [],
    rightHeel: [],
    centerOfPressure: [],
    footDecodingMeasurementRaw: []
  });

  constructor(
    protected footDecodingMeasurementService: FootDecodingMeasurementService,
    protected footDecodingMeasurementRawService: FootDecodingMeasurementRawService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ footDecodingMeasurement }) => {
      this.updateForm(footDecodingMeasurement);

      this.footDecodingMeasurementRawService
        .query({ filter: 'footdecodingmeasurement-is-null' })
        .pipe(
          map((res: HttpResponse<IFootDecodingMeasurementRaw[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IFootDecodingMeasurementRaw[]) => {
          if (!footDecodingMeasurement.footDecodingMeasurementRaw || !footDecodingMeasurement.footDecodingMeasurementRaw.id) {
            this.footdecodingmeasurementraws = resBody;
          } else {
            this.footDecodingMeasurementRawService
              .find(footDecodingMeasurement.footDecodingMeasurementRaw.id)
              .pipe(
                map((subRes: HttpResponse<IFootDecodingMeasurementRaw>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IFootDecodingMeasurementRaw[]) => (this.footdecodingmeasurementraws = concatRes));
          }
        });
    });
  }

  updateForm(footDecodingMeasurement: IFootDecodingMeasurement): void {
    this.editForm.patchValue({
      id: footDecodingMeasurement.id,
      leftFront: footDecodingMeasurement.leftFront,
      leftHeel: footDecodingMeasurement.leftHeel,
      rightFront: footDecodingMeasurement.rightFront,
      rightHeel: footDecodingMeasurement.rightHeel,
      centerOfPressure: footDecodingMeasurement.centerOfPressure,
      footDecodingMeasurementRaw: footDecodingMeasurement.footDecodingMeasurementRaw
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const footDecodingMeasurement = this.createFromForm();
    if (footDecodingMeasurement.id !== undefined) {
      this.subscribeToSaveResponse(this.footDecodingMeasurementService.update(footDecodingMeasurement));
    } else {
      this.subscribeToSaveResponse(this.footDecodingMeasurementService.create(footDecodingMeasurement));
    }
  }

  private createFromForm(): IFootDecodingMeasurement {
    return {
      ...new FootDecodingMeasurement(),
      id: this.editForm.get(['id'])!.value,
      leftFront: this.editForm.get(['leftFront'])!.value,
      leftHeel: this.editForm.get(['leftHeel'])!.value,
      rightFront: this.editForm.get(['rightFront'])!.value,
      rightHeel: this.editForm.get(['rightHeel'])!.value,
      centerOfPressure: this.editForm.get(['centerOfPressure'])!.value,
      footDecodingMeasurementRaw: this.editForm.get(['footDecodingMeasurementRaw'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFootDecodingMeasurement>>): void {
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

  trackById(index: number, item: IFootDecodingMeasurementRaw): any {
    return item.id;
  }
}
