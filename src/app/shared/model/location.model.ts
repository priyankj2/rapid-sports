import { ICareProvider } from "./care-provider.model";
import { IClinic } from "./clinic.model";
import { ICountry } from "./country.model";
import { IStateOrProvince } from "./state-or-province.model";


export interface ILocation {
  id?: number;
  name?: string;
  streetAddress1?: string;
  streetAddress2?: string;
  city?: string;
  postalCode?: string;
  stateOrProvince?: IStateOrProvince;
  country?: ICountry;
  careProvider?: ICareProvider;
  clinic?: IClinic;
}

export class Location implements ILocation {
  constructor(
    public id?: number,
    public name?: string,
    public streetAddress1?: string,
    public streetAddress2?: string,
    public city?: string,
    public postalCode?: string,
    public stateOrProvince?: IStateOrProvince,
    public country?: ICountry,
    public careProvider?: ICareProvider,
    public clinic?: IClinic
  ) {}
}
