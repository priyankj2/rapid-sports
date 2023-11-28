import { ICondition } from 'app/shared/model/condition.model';
import { IFootType } from 'app/shared/model/foot-type.model';
import { IAreaOfConcentration } from 'app/shared/model/area-of-concentration.model';
import { IClinic } from 'app/shared/model/clinic.model';
import { IExerciseOrModality } from 'app/shared/model/exercise-or-modality.model';
import { IObservation } from 'app/shared/model/observation.model';

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
