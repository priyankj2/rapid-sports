import { Moment } from 'moment';
import { IPatient } from 'app/shared/model/patient.model';
import { IUser } from 'app/core/user/user.model';

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
