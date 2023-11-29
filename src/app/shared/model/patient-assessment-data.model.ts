import { IAreaOfConcentration } from "./area-of-concentration.model";
import { IAssessment } from "./assessment.model";


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
