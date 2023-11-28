import { Moment } from 'moment';
import { IImageData } from 'app/shared/model/image-data.model';
import { IExerciseOrModality } from 'app/shared/model/exercise-or-modality.model';
import { IAreaOfConcentration } from 'app/shared/model/area-of-concentration.model';
import { ICareProvider } from 'app/shared/model/care-provider.model';
import { IObservation } from 'app/shared/model/observation.model';
import { IFootDecodingMeasurement } from 'app/shared/model/foot-decoding-measurement.model';
import { IFootType } from 'app/shared/model/foot-type.model';
import { ICondition } from 'app/shared/model/condition.model';
import { IAppointment } from 'app/shared/model/appointment.model';
import { IPatient } from 'app/shared/model/patient.model';

export interface IAssessment {
  id?: number;
  startTime?: Moment;
  selfAdministered?: boolean;
  score?: number;
  standardPathLength?: number;
  proPathLength?: number;
  visionPathLength?: number;
  vestibularPathLength?: number;
  standardPercentile?: number;
  proPercentile?: number;
  visionPercentile?: number;
  vestibularPercentile?: number;
  leftFrontPressure?: number;
  leftRearPressure?: number;
  rightFrontPressure?: number;
  rightRearPressure?: number;
  centerOfPressureX?: number;
  centerOfPressureY?: number;
  painLevel?: number;
  notes?: string;
  imageData?: IImageData;
  courseOfActions?: IExerciseOrModality[];
  areas?: IAreaOfConcentration[];
  careProvider?: ICareProvider;
  observation?: IObservation;
  measurement?: IFootDecodingMeasurement;
  footType?: IFootType;
  leftFootType?: IFootType;
  rightFootType?: IFootType;
  condition?: ICondition;
  appointment?: IAppointment;
  patient?: IPatient;
  totalPressure?: number;
  totalLeftPressure?: number;
  totalRightPressure?: number;
  totalFrontPressure?: number;
  totalRearPressure?: number;
  startTimeAsDate?: Date;
}

export class Assessment implements IAssessment {
  public startTimeAsDate?: Date;
  constructor(
    public id?: number,
    public startTime?: Moment,
    public selfAdministered?: boolean,
    public score?: number,
    public standardPathLength?: number,
    public proPathLength?: number,
    public visionPathLength?: number,
    public vestibularPathLength?: number,
    public standardPercentile?: number,
    public proPercentile?: number,
    public visionPercentile?: number,
    public vestibularPercentile?: number,
    public leftFrontPressure?: number,
    public leftRearPressure?: number,
    public rightFrontPressure?: number,
    public rightRearPressure?: number,
    public centerOfPressureX?: number,
    public centerOfPressureY?: number,
    public painLevel?: number,
    public notes?: string,
    public imageData?: IImageData,
    public courseOfActions?: IExerciseOrModality[],
    public areas?: IAreaOfConcentration[],
    public careProvider?: ICareProvider,
    public observation?: IObservation,
    public measurement?: IFootDecodingMeasurement,
    public footType?: IFootType,
    public leftFootType?: IFootType,
    public rightFootType?: IFootType,
    public condition?: ICondition,
    public appointment?: IAppointment,
    public patient?: IPatient,
    public totalPressure?: number,
    public totalLeftPressure?: number,
    public totalRightPressure?: number,
    public totalFrontPressure?: number,
    public totalRearPressure?: number
  ) {
    this.selfAdministered = this.selfAdministered || false;
    if (this.startTime) {
      this.startTimeAsDate = this.startTime.toDate();
    }
  }
}
