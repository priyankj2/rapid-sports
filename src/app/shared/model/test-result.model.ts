import { IAreaOfConcentration } from 'app/shared/model/area-of-concentration.model';
import { IFootType } from 'app/shared/model/foot-type.model';
import { ICondition } from 'app/shared/model/condition.model';

export interface ITestResult {
  id?: number;
  title?: string;
  description?: string;
  areaOfConcentrations?: IAreaOfConcentration[];
  footType?: IFootType;
  condition?: ICondition;
}

export class TestResult implements ITestResult {
  constructor(
    public id?: number,
    public title?: string,
    public description?: string,
    public areaOfConcentrations?: IAreaOfConcentration[],
    public footType?: IFootType,
    public condition?: ICondition
  ) {}
}
