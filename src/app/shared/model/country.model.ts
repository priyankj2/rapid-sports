export interface ICountry {
  id?: number;
  name?: string;
  abbreviation?: string;
}

export class Country implements ICountry {
  constructor(public id?: number, public name?: string, public abbreviation?: string) {}
}
