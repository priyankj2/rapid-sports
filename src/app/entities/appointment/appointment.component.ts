import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AppointmentService } from './appointment.service';
import { AppointmentDeleteDialogComponent } from './appointment-delete-dialog.component';
import { IAppointment } from '../../shared/model/appointment.model';

@Component({
  selector: 'jhi-appointment',
  templateUrl: './appointment.component.html'
})
export class AppointmentComponent implements OnInit, OnDestroy {
  appointments?: IAppointment[];
  eventSubscriber?: Subscription;

  constructor(
    protected appointmentService: AppointmentService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.appointmentService.query().subscribe((res: HttpResponse<IAppointment[]>) => (this.appointments = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInAppointments();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IAppointment): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInAppointments(): void {
    this.eventSubscriber = this.eventManager.subscribe('appointmentListModification', () => this.loadAll());
  }

  delete(appointment: IAppointment): void {
    const modalRef = this.modalService.open(AppointmentDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.appointment = appointment;
  }
}
