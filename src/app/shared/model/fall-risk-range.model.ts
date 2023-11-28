import { IAgeGroup } from 'app/shared/model/age-group.model';
import { Gender } from 'app/shared/model/enumerations/gender.model';

export interface IFallRiskRange {
  id?: number;
  gender?: Gender;
  minimumValue?: number;
  maximumValue?: number;
  color?: string;
  ageGroup?: IAgeGroup;
}

export class FallRiskRange implements IFallRiskRange {
  constructor(
    public id?: number,
    public gender?: Gender,
    public minimumValue?: number,
    public maximumValue?: number,
    public color?: string,
    public ageGroup?: IAgeGroup
  ) {}
}
