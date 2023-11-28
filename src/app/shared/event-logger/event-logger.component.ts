import { Component, OnInit } from '@angular/core';
import { EventLoggerService } from 'app/shared/event-logger.service';

@Component({
  selector: 'jhi-event-logger',
  templateUrl: './event-logger.component.html',
  styleUrls: ['./event-logger.component.scss']
})
export class EventLoggerComponent implements OnInit {
  constructor(public logger: EventLoggerService) {}

  ngOnInit(): void {}

  onClear(): void {
    this.logger.events = [];
  }
}
