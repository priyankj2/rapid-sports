export interface ICondition {
  id?: number;
  name?: string;
  primaryArea?: string;
  description?: string;
  enabled?: boolean;
  displayOrder?: number;
}

export class Condition implements ICondition {
  constructor(
    public id?: number,
    public name?: string,
    public primaryArea?: string,
    public description?: string,
    public enabled?: boolean,
    public displayOrder?: number
  ) {
    this.enabled = this.enabled || false;
  }
}
