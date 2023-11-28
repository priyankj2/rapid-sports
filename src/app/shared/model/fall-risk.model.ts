import { IAgeGroup } from 'app/shared/model/age-group.model';
import { Gender } from 'app/shared/model/enumerations/gender.model';

export interface IFallRisk {
  id?: number;
  gender?: Gender;
  minimumLength?: number;
  percentileRank?: number;
  ageGroup?: IAgeGroup;
}

export class FallRisk implements IFallRisk {
  constructor(
    public id?: number,
    public gender?: Gender,
    public minimumLength?: number,
    public percentileRank?: number,
    public ageGroup?: IAgeGroup
  ) {}
}
