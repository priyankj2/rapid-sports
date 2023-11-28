import { IUser } from 'app/core/user/user.model';
import { ILocation } from 'app/shared/model/location.model';
import { IClinic } from 'app/shared/model/clinic.model';

export interface ICareProvider {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  officeAdministrator?: boolean;
  user?: IUser;
  locations?: ILocation[];
  clinic?: IClinic;
}

export class CareProvider implements ICareProvider {
  constructor(
    public id?: number,
    public firstName?: string,
    public lastName?: string,
    public email?: string,
    public officeAdministrator?: boolean,
    public user?: IUser,
    public locations?: ILocation[],
    public clinic?: IClinic
  ) {
    this.officeAdministrator = this.officeAdministrator || false;
  }
}
