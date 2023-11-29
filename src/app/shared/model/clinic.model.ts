
import { Moment } from 'moment';
import { ILocation } from './location.model';
import { ISupportingVideo } from './supporting-video.model';

export interface IClinic {
  id?: number;
  name?: string;
  logoUrl?: string;
  brandingText?: string;
  locations?: ILocation[];
  supportingVideos?: ISupportingVideo[];
  licenseStartDate?: Moment;
  licenseEndDate?: Moment;
  daysRemaining?: number;
}

export class Clinic implements IClinic {
  constructor(
    public id?: number,
    public name?: string,
    public logoUrl?: string,
    public brandingText?: string,
    public locations?: ILocation[],
    public supportingVideos?: ISupportingVideo[],
    public licenseStartDate?: Moment,
    public licenseEndDate?: Moment
  ) {}
}
