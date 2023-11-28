import { IFootDecodingMeasurementRaw } from 'app/shared/model/foot-decoding-measurement-raw.model';

export interface IFootDecodingMeasurement {
  id?: number;
  leftFront?: number;
  leftHeel?: number;
  rightFront?: number;
  rightHeel?: number;
  centerOfPressure?: number;
  footDecodingMeasurementRaw?: IFootDecodingMeasurementRaw;
}

export class FootDecodingMeasurement implements IFootDecodingMeasurement {
  constructor(
    public id?: number,
    public leftFront?: number,
    public leftHeel?: number,
    public rightFront?: number,
    public rightHeel?: number,
    public centerOfPressure?: number,
    public footDecodingMeasurementRaw?: IFootDecodingMeasurementRaw
  ) {}
}
