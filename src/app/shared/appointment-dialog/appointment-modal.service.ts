import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AppointmentService } from '../../entities/appointment/appointment.service';
import { IPatient } from '../model/patient.model';
import { AppointmentDialogComponent } from './appointment-dialog.component';


@Injectable({
  providedIn: 'root'
})
export class AppointmentModalService {
  private isOpen = false;

  constructor(private modalService: NgbModal, private appointmentService: AppointmentService) {}

  open(patient: IPatient): void {
    if (this.isOpen) {
      return;
    }
    this.isOpen = true;
    const modalRef: NgbModalRef = this.modalService.open(AppointmentDialogComponent);
    modalRef.componentInstance.patient = patient;
    modalRef.result.then(result => {
      if (result) {
        this.appointmentService.dataChanged();
      }
    });
    modalRef.result.finally(() => {
      this.isOpen = false;
    });
  }
}
