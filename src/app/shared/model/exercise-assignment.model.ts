import { IExerciseOrModality } from "./exercise-or-modality.model";
import { IPatientCourseOfAction } from "./patient-course-of-action.model";


export interface IExerciseAssignment {
  id?: number;
  sets?: number;
  reps?: number;
  holdTime?: number;
  resistance?: number;
  days?: number;
  custom?: boolean;
  exerciseOrModality?: IExerciseOrModality;
  patientCourseOfAction?: IPatientCourseOfAction;
}

export class ExerciseAssignment implements IExerciseAssignment {
  constructor(
    public id?: number,
    public sets?: number,
    public reps?: number,
    public holdTime?: number,
    public resistance?: number,
    public days?: number,
    public custom?: boolean,
    public exerciseOrModality?: IExerciseOrModality,
    public patientCourseOfAction?: IPatientCourseOfAction
  ) {
    this.custom = this.custom || false;
  }
}
