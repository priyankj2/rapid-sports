import { IAreaOfConcentration } from "./area-of-concentration.model";
import { ICondition } from "./condition.model";
import { IFootType } from "./foot-type.model";

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
