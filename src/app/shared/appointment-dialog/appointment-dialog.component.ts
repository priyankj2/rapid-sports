import { Component, Input, OnInit } from '@angular/core';
import { IPatient } from 'app/shared/model/patient.model';
import { AppointmentService } from 'app/entities/appointment/appointment.service';
import { LocationService } from 'app/entities/location/location.service';
import { PatientService } from 'app/entities/patient/patient.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Appointment, IAppointment } from 'app/shared/model/appointment.model';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'jhi-appointment-dialog',
  templateUrl: './appointment-dialog.component.html',
  styleUrls: ['./appointment-dialog.component.scss']
})
export class AppointmentDialogComponent implements OnInit {
  isSaving = false;
  @Input() public patient?: IPatient;
  @Input() public appointment?: IAppointment;

  now = moment().toDate();

  editForm = this.fb.group({
    id: [],
    startTime: [null, [Validators.required]],
    endTime: [null, [Validators.required]],
    location: [],
    patient: []
  });

  constructor(
    protected appointmentService: AppointmentService,
    protected locationService: LocationService,
    protected patientService: PatientService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
    if (!this.appointment) {
      this.appointment = new Appointment();
      this.appointment.patient = this.patient;
      this.appointment.startTime = moment();
      this.appointment.endTime = moment().add(30, 'minutes');
    }
    this.updateForm(this.appointment);
  }

  save(): void {
    this.isSaving = true;
    const appointment = this.createFromForm();
    if (appointment.id !== undefined) {
      this.subscribeToSaveResponse(this.appointmentService.update(appointment));
    } else {
      this.subscribeToSaveResponse(this.appointmentService.create(appointment));
    }
  }

  cancel(): void {
    this.activeModal.close();
  }

  updateForm(appointment: IAppointment): void {
    this.editForm.patchValue({
      id: appointment.id,
      startTime: appointment.startTime ? appointment.startTime.toDate() : this.now,
      endTime: appointment.endTime
        ? appointment.endTime.toDate()
        : moment()
            .add(30, 'minutes')
            .toDate(),
      location: appointment.location,
      patient: appointment.patient
    });
  }

  private createFromForm(): IAppointment {
    return {
      ...new Appointment(),
      id: this.editForm.get(['id'])!.value,
      startTime: this.editForm.get(['startTime'])!.value ? moment(this.editForm.get(['startTime'])!.value, DATE_TIME_FORMAT) : undefined,
      endTime: this.editForm.get(['endTime'])!.value ? moment(this.editForm.get(['endTime'])!.value, DATE_TIME_FORMAT) : undefined,
      location: this.editForm.get(['location'])!.value,
      patient: this.editForm.get(['patient'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAppointment>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.activeModal.close(this.appointment);
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  onStartTimeChanged(startTime: Date): void {
    if (startTime) {
      const endTimeControl = this.editForm.get('endTime');
      const updatedEndTime = moment(startTime)
        .add(30, 'minutes')
        .toDate();
      endTimeControl?.setValue(updatedEndTime);
    }
  }
}
