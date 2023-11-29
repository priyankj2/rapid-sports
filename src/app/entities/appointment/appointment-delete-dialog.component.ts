import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AppointmentService } from './appointment.service';
import { IAppointment } from '../../shared/model/appointment.model';

@Component({
  templateUrl: './appointment-delete-dialog.component.html'
})
export class AppointmentDeleteDialogComponent {
  appointment?: IAppointment;

  constructor(
    protected appointmentService: AppointmentService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.appointmentService.delete(id).subscribe(() => {
      this.eventManager.broadcast('appointmentListModification');
      this.activeModal.close();
    });
  }
}
