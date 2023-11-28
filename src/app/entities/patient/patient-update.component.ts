import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IPatient, Patient } from 'app/shared/model/patient.model';
import { PatientService } from './patient.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { ICondition } from 'app/shared/model/condition.model';
import { ConditionService } from 'app/entities/condition/condition.service';
import { IClinic } from 'app/shared/model/clinic.model';
import { ClinicService } from 'app/entities/clinic/clinic.service';

type SelectableEntity = IUser | ICondition | IClinic;

@Component({
  selector: 'jhi-patient-update',
  templateUrl: './patient-update.component.html'
})
export class PatientUpdateComponent implements OnInit {
  isSaving = false;
  users: IUser[] = [];
  conditions: ICondition[] = [];
  clinics: IClinic[] = [];

  editForm = this.fb.group({
    id: [],
    firstName: [null, [Validators.required]],
    lastName: [null, [Validators.required]],
    gender: [null, [Validators.required]],
    email: [null, [Validators.pattern('^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$')]],
    dateOfBirth: [null, [Validators.required]],
    medicalHistory: [],
    patientID: [],
    therapyWeeks: [],
    user: [],
    primaryComplaint: [null, [Validators.required]],
    clinic: [null, [Validators.required]]
  });

  constructor(
    protected patientService: PatientService,
    protected userService: UserService,
    protected conditionService: ConditionService,
    protected clinicService: ClinicService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ patient }) => {
      this.updateForm(patient);

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));

      this.conditionService.query().subscribe((res: HttpResponse<ICondition[]>) => (this.conditions = res.body || []));

      this.clinicService.query().subscribe((res: HttpResponse<IClinic[]>) => {
        this.clinics = res.body || [];
        if (this.clinics.length === 1) {
          this.editForm.patchValue({
            clinic: this.clinics[0]
          });
        }
      });
    });
  }

  updateForm(patient: IPatient): void {
    this.editForm.patchValue({
      id: patient.id,
      firstName: patient.firstName,
      lastName: patient.lastName,
      gender: patient.gender,
      email: patient.email,
      dateOfBirth: patient.dateOfBirth ? patient.dateOfBirth.toDate() : null,
      medicalHistory: patient.medicalHistory,
      patientID: patient.patientID,
      therapyWeeks: patient.therapyWeeks,
      user: patient.user,
      primaryComplaint: patient.primaryComplaint,
      clinic: patient.clinic
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const patient = this.createFromForm();
    console.log('patient to be saved', patient);
    if (patient.id !== undefined) {
      this.subscribeToSaveResponse(this.patientService.update(patient));
    } else {
      this.subscribeToSaveResponse(this.patientService.create(patient));
    }
  }

  private createFromForm(): IPatient {
    return {
      ...new Patient(),
      id: this.editForm.get(['id'])!.value,
      firstName: this.editForm.get(['firstName'])!.value,
      lastName: this.editForm.get(['lastName'])!.value,
      gender: this.editForm.get(['gender'])!.value,
      email: this.editForm.get(['email'])!.value,
      dateOfBirth: this.editForm.get(['dateOfBirth'])!.value
        ? moment(this.editForm.get(['dateOfBirth'])!.value, DATE_TIME_FORMAT)
        : undefined,
      medicalHistory: this.editForm.get(['medicalHistory'])!.value,
      patientID: this.editForm.get(['patientID'])!.value,
      therapyWeeks: this.editForm.get(['therapyWeeks'])!.value,
      user: this.editForm.get(['user'])!.value,
      primaryComplaint: this.editForm.get(['primaryComplaint'])!.value,
      clinic: this.editForm.get(['clinic'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPatient>>): void {
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
