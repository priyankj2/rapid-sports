export interface IStateOrProvince {
  id?: number;
  name?: string;
  abbreviation?: string;
}

export class StateOrProvince implements IStateOrProvince {
  constructor(public id?: number, public name?: string, public abbreviation?: string) {}
}
