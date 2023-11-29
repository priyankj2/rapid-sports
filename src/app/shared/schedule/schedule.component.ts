import { Component, OnDestroy, OnInit } from '@angular/core';
import { EventClickEvent, SchedulerEvent } from '@progress/kendo-angular-scheduler';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppointmentService } from '../../entities/appointment/appointment.service';

@Component({
  selector: 'jhi-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit, OnDestroy {
  public selectedDate: Date = new Date();
  public events?: SchedulerEvent[];
  public eventSubscription?: Subscription;
  private selectedEvent?: any;
  private dataChangeSubscription?: Subscription;

  constructor(private router: Router, private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.refresh();
    this.dataChangeSubscription = this.appointmentService.dataChangeNotification.subscribe(() => this.refresh());
  }

  refresh(): void {
    if (this.eventSubscription) {
      this.eventSubscription.unsubscribe();
    }
    this.eventSubscription = this.appointmentService.query().subscribe(appointments => {
      this.events = appointments.body?.map(
        dataItem =>
          ({
            id: dataItem.id,
            start: dataItem.startTime?.toDate(),
            end: dataItem.endTime?.toDate(),
            title: dataItem.patient?.firstName + ' ' + dataItem.patient?.lastName,
            ownerID: dataItem.patient?.id
          } as SchedulerEvent)
      );
    });
  }

  ngOnDestroy(): void {
    if (this.eventSubscription) {
      this.eventSubscription.unsubscribe();
    }

    if (this.dataChangeSubscription) {
      this.dataChangeSubscription.unsubscribe();
    }
  }

  onSelectAppointment($event: EventClickEvent): void {
    this.selectedEvent = $event.event;
    this.router.navigate(['athlete', this.selectedEvent.dataItem.ownerID, 'session']);
  }
}
