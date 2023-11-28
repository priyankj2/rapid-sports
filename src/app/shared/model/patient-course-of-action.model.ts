import { Moment } from 'moment';
import { IPatient } from 'app/shared/model/patient.model';
import { IAssessment } from 'app/shared/model/assessment.model';
import { IExerciseAssignment } from 'app/shared/model/exercise-assignment.model';

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
