import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IPatientNote, PatientNote } from 'app/shared/model/patient-note.model';
import { PatientNoteService } from './patient-note.service';
import { IPatient } from 'app/shared/model/patient.model';
import { PatientService } from 'app/entities/patient/patient.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';

type SelectableEntity = IPatient | IUser;

@Component({
  selector: 'jhi-patient-note-update',
  templateUrl: './patient-note-update.component.html'
})
export class PatientNoteUpdateComponent implements OnInit {
  isSaving = false;
  patients: IPatient[] = [];
  users: IUser[] = [];

  editForm = this.fb.group({
    id: [],
    dateCreated: [],
    noteText: [null, [Validators.maxLength(2000)]],
    patient: [],
    createdBy: []
  });

  constructor(
    protected patientNoteService: PatientNoteService,
    protected patientService: PatientService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ patientNote }) => {
      if (!patientNote.id) {
        const today = moment().startOf('day');
        patientNote.dateCreated = today;
      }

      this.updateForm(patientNote);

      this.patientService.query().subscribe((res: HttpResponse<IPatient[]>) => (this.patients = res.body || []));

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));
    });
  }

  updateForm(patientNote: IPatientNote): void {
    this.editForm.patchValue({
      id: patientNote.id,
      dateCreated: patientNote.dateCreated ? patientNote.dateCreated.format(DATE_TIME_FORMAT) : null,
      noteText: patientNote.noteText,
      patient: patientNote.patient,
      createdBy: patientNote.createdBy
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const patientNote = this.createFromForm();
    if (patientNote.id !== undefined) {
      this.subscribeToSaveResponse(this.patientNoteService.update(patientNote));
    } else {
      this.subscribeToSaveResponse(this.patientNoteService.create(patientNote));
    }
  }

  private createFromForm(): IPatientNote {
    return {
      ...new PatientNote(),
      id: this.editForm.get(['id'])!.value,
      dateCreated: this.editForm.get(['dateCreated'])!.value
        ? moment(this.editForm.get(['dateCreated'])!.value, DATE_TIME_FORMAT)
        : undefined,
      noteText: this.editForm.get(['noteText'])!.value,
      patient: this.editForm.get(['patient'])!.value,
      createdBy: this.editForm.get(['createdBy'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPatientNote>>): void {
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
