import { IAgeGroup } from "./age-group.model";
import { Gender } from "./enumerations/gender.model";
import { TestCode } from "./enumerations/test-code.model";


export interface IBalancePercentile {
  id?: number;
  gender?: Gender;
  testCode?: TestCode;
  minimumLength?: number;
  percentileRank?: number;
  ageGroup?: IAgeGroup;
}

export class BalancePercentile implements IBalancePercentile {
  constructor(
    public id?: number,
    public gender?: Gender,
    public testCode?: TestCode,
    public minimumLength?: number,
    public percentileRank?: number,
    public ageGroup?: IAgeGroup
  ) {}
}
