import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Device } from 'app/core/boditrak/device.model';
import { map } from 'rxjs/operators';
import { RingBuffer } from 'app/core/boditrak/ring-buffer.model';

@Injectable({
  providedIn: 'root'
})
export class BoditrakService {
  api = '/api';
  animation: any;
  canvas: any;
  ctx: any;
  sizer: any;
  hmGraph: any;
  lastTimeFrame: any;
  heatmap: any;
  sensor: any;
  sse: any;
  maxMultipliers = [1, 2, 5, 10, 0.1, 0.2, 0.5];
  mmIndex = 0;
  frames = new RingBuffer(200);

  constructor(private http: HttpClient) {}

  readDeviceInfo(deviceAddress: string): Observable<Device> {
    return this.http.get<any>(deviceAddress).pipe(
      map(result => {
        this.api = 'http://' + deviceAddress + '/api';
        return new Device(result.id, result.name, result.address, result.model, result.class);
      })
    );
  }

  getProperty(name: string, onDone: any): void {
    this.http.get(this.api + name).subscribe(result => onDone(result));
  }

  setProperty(name: string, value: any): void {
    this.http.put(this.api + name, value).subscribe();
  }

  setStringProperty(name: string, value: any): void {
    this.setProperty(name, '"' + value + '"');
  }

  setNumericProperty(name: string, value: number): void {
    this.setProperty(name, value.toString());
  }

  setFrequency(hz: number): void {
    this.setNumericProperty('frequency', Math.round(hz * 3600));
  }

  setNoiseFilter(value?: boolean): void {
    this.setProperty('filters/noise', value ? 'true' : 'false');
  }

  setSmoothFilter(value?: boolean): void {
    this.setProperty('filters/smooth', value ? 'true' : 'false');
  }

  setSpotFilter(value?: boolean): void {
    this.setProperty('filters/spot', value ? 'true' : 'false');
  }

  getEventSource(precision?: boolean): EventSource {
    if (precision) {
      return new EventSource(this.api + 'sse?precision=1');
    }
    return new EventSource(this.api + 'sse');
  }

  getShiftEvents(): EventSource {
    return new EventSource(this.api + 'shift/sse');
  }

  setShiftRebalance(value: any): void {
    this.setProperty('shift/rebalance', value);
  }
}
