import { IFootType } from 'app/shared/model/foot-type.model';
import * as moment from 'moment';

export class FootTestResult {
  constructor(
    public leftFoot?: IFootType,
    public rightFoot?: IFootType,
    public leftFrontPressure = 0,
    public leftRearPressure = 0,
    public rightFrontPressure = 0,
    public rightRearPressure = 0,
    public timeTaken = moment()
  ) {}

  get totalPressure(): number {
    return this.leftFrontPressure + this.leftRearPressure + this.rightFrontPressure + this.rightRearPressure;
  }

  get totalLeftPressure(): number {
    return this.leftFrontPressure + this.leftRearPressure;
  }

  get totalRightPressure(): number {
    return this.rightFrontPressure + this.rightRearPressure;
  }

  get totalFrontPressure(): number {
    return this.leftFrontPressure + this.rightFrontPressure;
  }

  get totalRearPressure(): number {
    return this.leftRearPressure + this.rightRearPressure;
  }
}
