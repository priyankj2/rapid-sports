import { IUser } from "../../core/user/user.model";
import { IClinic } from "./clinic.model";
import { ILocation } from "./location.model";


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
