import { Moment } from 'moment';
import { IUser } from '../../core/user/user.model';
import { IPatient } from './patient.model';


export interface IPatientNote {
  id?: number;
  dateCreated?: Moment;
  noteText?: string;
  patient?: IPatient;
  createdBy?: IUser;
}

export class PatientNote implements IPatientNote {
  constructor(
    public id?: number,
    public dateCreated?: Moment,
    public noteText?: string,
    public patient?: IPatient,
    public createdBy?: IUser
  ) {}
}
