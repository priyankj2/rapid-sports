import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventLoggerService {
  public events: string[] = [];

  constructor() {}
}
