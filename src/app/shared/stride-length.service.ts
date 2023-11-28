/* eslint-disable @typescript-eslint/tslint/config */
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StrideLengthService {
  private strideLengthSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  setStrideLength(value: number) {
    this.strideLengthSubject.next(value);
  }

  getStrideLength(): Observable<number> {
    return this.strideLengthSubject.asObservable();
  }
}
