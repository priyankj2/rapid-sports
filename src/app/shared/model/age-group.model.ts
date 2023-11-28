export interface IAgeGroup {
  id?: number;
  minimumAge?: number;
  maximumAge?: number;
}

export class AgeGroup implements IAgeGroup {
  constructor(public id?: number, public minimumAge?: number, public maximumAge?: number) {}
}
