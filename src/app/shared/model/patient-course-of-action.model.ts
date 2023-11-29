import { Moment } from 'moment';
import { IAssessment } from './assessment.model';
import { IExerciseAssignment } from './exercise-assignment.model';
import { IPatient } from './patient.model';


export interface IPatientCourseOfAction {
  id?: number;
  assignmentDate?: Moment;
  patient?: IPatient;
  assessment?: IAssessment;
  exerciseAssignments?: IExerciseAssignment[];
}

export class PatientCourseOfAction implements IPatientCourseOfAction {
  constructor(
    public id?: number,
    public assignmentDate?: Moment,
    public patient?: IPatient,
    public assessment?: IAssessment,
    public exerciseAssignments?: IExerciseAssignment[]
  ) {}
}
