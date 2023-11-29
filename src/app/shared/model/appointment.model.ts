import { Moment } from 'moment';
import { ILocation } from './location.model';
import { IPatient } from './patient.model';


export interface IAppointment {
  id?: number;
  startTime?: Moment;
  endTime?: Moment;
  location?: ILocation;
  patient?: IPatient;
}

export class Appointment implements IAppointment {
  constructor(
    public id?: number,
    public startTime?: Moment,
    public endTime?: Moment,
    public location?: ILocation,
    public patient?: IPatient
  ) {}
}
