import { IStateOrProvince } from 'app/shared/model/state-or-province.model';
import { ICountry } from 'app/shared/model/country.model';
import { ICareProvider } from 'app/shared/model/care-provider.model';
import { IClinic } from 'app/shared/model/clinic.model';

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
