import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { IClinic, Clinic } from 'app/shared/model/clinic.model';
import { ClinicService } from './clinic.service';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

@Component({
  selector: 'jhi-clinic-update',
  templateUrl: './clinic-update.component.html'
})
export class ClinicUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    logoUrl: [],
    brandingText: [],
    license: [],
    licenseStartDate: [null, [Validators.required]],
    licenseEndDate: [null, [Validators.required]]
  });

  constructor(protected clinicService: ClinicService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ clinic }) => {
      this.updateForm(clinic);
    });
  }

  updateForm(clinic: IClinic): void {
    this.editForm.patchValue({
      id: clinic.id,
      name: clinic.name,
      logoUrl: clinic.logoUrl,
      brandingText: clinic.brandingText,
      licenseStartDate: clinic.licenseStartDate ? moment(clinic.licenseStartDate).format(DATE_TIME_FORMAT) : null,
      licenseEndDate: clinic.licenseEndDate ? moment(clinic.licenseEndDate).format(DATE_TIME_FORMAT) : null
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const clinic = this.createFromForm();
    if (clinic.id !== undefined) {
      this.subscribeToSaveResponse(this.clinicService.update(clinic));
    } else {
      this.subscribeToSaveResponse(this.clinicService.create(clinic));
    }
  }

  handleRadioChange(): void {
    const licenseValue = this.editForm.get(['license'])!.value;

    if (licenseValue === '0') {
      this.editForm.controls['licenseStartDate'].enable();
      this.editForm.controls['licenseEndDate'].enable();
      this.editForm.patchValue({
        licenseEndDate: null,
        licenseStartDate: null
      });
    } else {
      this.editForm.controls['licenseStartDate'].disable();
      this.editForm.controls['licenseEndDate'].disable();
      this.editForm.patchValue({
        licenseEndDate: moment()
          .add(licenseValue, 'days')
          .format(DATE_TIME_FORMAT),
        licenseStartDate: moment(new Date()).format(DATE_TIME_FORMAT)
      });
    }
  }

  private createFromForm(): IClinic {
    return {
      ...new Clinic(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      logoUrl: this.editForm.get(['logoUrl'])!.value,
      brandingText: this.editForm.get(['brandingText'])!.value,
      licenseStartDate: this.editForm.get(['licenseStartDate'])!.value
        ? moment(this.editForm.get(['licenseStartDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
      licenseEndDate: this.editForm.get(['licenseEndDate'])!.value
        ? moment(this.editForm.get(['licenseEndDate'])!.value, DATE_TIME_FORMAT)
        : undefined
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IClinic>>): void {
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
