import { IFootDecodingMeasurement } from "./foot-decoding-measurement.model";

export interface IFootDecodingMeasurementRaw {
  id?: number;
  rawData?: string;
  footDecodingMeasurement?: IFootDecodingMeasurement;
}

export class FootDecodingMeasurementRaw implements IFootDecodingMeasurementRaw {
  constructor(public id?: number, public rawData?: string, public footDecodingMeasurement?: IFootDecodingMeasurement) {}
}
