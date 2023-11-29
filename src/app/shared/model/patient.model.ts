import { Moment } from 'moment';
import { IUser } from '../../core/user/user.model';
import { IAppointment } from './appointment.model';
import { IAssessment } from './assessment.model';
import { IClinic } from './clinic.model';
import { ICondition } from './condition.model';
import { Gender } from './enumerations/gender.model';
import { IPatientNote } from './patient-note.model';


export interface IPatient {
  id?: number;
  firstName?: string;
  lastName?: string;
  gender?: Gender;
  email?: string;
  dateOfBirth?: Moment;
  medicalHistory?: string;
  patientID?: string;
  therapyWeeks?: number;
  user?: IUser;
  assessments?: IAssessment[];
  notes?: IPatientNote[];
  appointments?: IAppointment[];
  primaryComplaint?: ICondition;
  clinic?: IClinic;
  assessmentCount?: number;
  fullName?: string;
}

export class Patient implements IPatient {
  constructor(
    public id?: number,
    public firstName?: string,
    public lastName?: string,
    public gender?: Gender,
    public email?: string,
    public dateOfBirth?: Moment,
    public medicalHistory?: string,
    public patientID?: string,
    public therapyWeeks?: number,
    public user?: IUser,
    public assessments?: IAssessment[],
    public notes?: IPatientNote[],
    public appointments?: IAppointment[],
    public primaryComplaint?: ICondition,
    public clinic?: IClinic,
    public assessmentCount?: number,
    public fullName?: string,
    public remainingDays?: any
  ) {
    this.fullName = this.lastName + ', ' + this.firstName;
  }
}
