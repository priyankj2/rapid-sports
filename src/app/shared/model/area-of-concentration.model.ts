import { ITestResult } from 'app/shared/model/test-result.model';
import { IAssessment } from 'app/shared/model/assessment.model';

export interface IAreaOfConcentration {
  id?: number;
  name?: string;
  orthopedic?: boolean;
  description?: string;
  testResult?: ITestResult;
  assessment?: IAssessment;
}

export class AreaOfConcentration implements IAreaOfConcentration {
  constructor(
    public id?: number,
    public name?: string,
    public orthopedic?: boolean,
    public description?: string,
    public testResult?: ITestResult,
    public assessment?: IAssessment
  ) {
    this.orthopedic = this.orthopedic || false;
  }
}
