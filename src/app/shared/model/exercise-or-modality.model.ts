import { IAssessment } from "./assessment.model";
import { ICourseOfActionMapping } from "./course-of-action-mapping.model";
import { ISupportingVideo } from "./supporting-video.model";


export interface IExerciseOrModality {
  id?: number;
  name?: string;
  description?: string;
  hasSets?: boolean;
  hasReps?: boolean;
  hasHoldTime?: boolean;
  hasResistance?: boolean;
  hasDays?: boolean;
  defaultSets?: number;
  defaultReps?: number;
  defaultHoldTime?: number;
  defaultResistance?: number;
  defaultDays?: number;
  currentSuccessRate?: number;
  supportingVideos?: ISupportingVideo[];
  assessment?: IAssessment;
  recommendations?: ICourseOfActionMapping[];
}

export class ExerciseOrModality implements IExerciseOrModality {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public hasSets?: boolean,
    public hasReps?: boolean,
    public hasHoldTime?: boolean,
    public hasResistance?: boolean,
    public hasDays?: boolean,
    public defaultSets?: number,
    public defaultReps?: number,
    public defaultHoldTime?: number,
    public defaultResistance?: number,
    public defaultDays?: number,
    public currentSuccessRate?: number,
    public supportingVideos?: ISupportingVideo[],
    public assessment?: IAssessment,
    public recommendations?: ICourseOfActionMapping[]
  ) {
    this.hasSets = this.hasSets || false;
    this.hasReps = this.hasReps || false;
    this.hasHoldTime = this.hasHoldTime || false;
    this.hasResistance = this.hasResistance || false;
    this.hasDays = this.hasDays || false;
  }
}
