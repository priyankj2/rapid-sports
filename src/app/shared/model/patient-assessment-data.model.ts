import { IAssessment } from 'app/shared/model/assessment.model';
import { IAreaOfConcentration } from 'app/shared/model/area-of-concentration.model';

export interface IPatientAssessmentData {
  baseline?: IAssessment;
  mostRecent?: IAssessment;
  postBaseline?: IAssessment[];
  recommendedAreasOfConcentration?: IAreaOfConcentration[];
}

export class PatientAssessmentData implements IPatientAssessmentData {
  constructor(
    baseline?: IAssessment,
    mostRecent?: IAssessment,
    postBaseline?: IAssessment[],
    recommendedAreasOfConcentration?: IAreaOfConcentration[]
  ) {}
}
