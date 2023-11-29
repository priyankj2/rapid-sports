import { IAreaOfConcentration } from "./area-of-concentration.model";
import { IClinic } from "./clinic.model";
import { ICondition } from "./condition.model";
import { IExerciseOrModality } from "./exercise-or-modality.model";
import { IFootType } from "./foot-type.model";
import { IObservation } from "./observation.model";


export interface ICourseOfActionMapping {
  id?: number;
  label?: string;
  condition?: ICondition;
  footType?: IFootType;
  areaOfConcentration?: IAreaOfConcentration;
  clinic?: IClinic;
  exercises?: IExerciseOrModality[];
  observation?: IObservation;
}

export class CourseOfActionMapping implements ICourseOfActionMapping {
  constructor(
    public id?: number,
    public label?: string,
    public condition?: ICondition,
    public footType?: IFootType,
    public areaOfConcentration?: IAreaOfConcentration,
    public clinic?: IClinic,
    public exercises?: IExerciseOrModality[],
    public observation?: IObservation
  ) {}
}
