import { ILocation } from 'app/shared/model/location.model';
import { ISupportingVideo } from 'app/shared/model/supporting-video.model';
import { Moment } from 'moment';

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
