export interface IObservation {
  id?: number;
  name?: string;
  description?: string;
  instructionalText?: string;
  exampleImageUrl?: string;
  internalCode?: string;
  observationDuration?: number;
  enabled?: boolean;
  displayOrder?: number;
  category?: string;
  focusStageNumber?: number;
  stageCount?: number;
  visible?: boolean;
}

export class Observation implements IObservation {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public instructionalText?: string,
    public exampleImageUrl?: string,
    public internalCode?: string,
    public observationDuration?: number,
    public enabled?: boolean,
    public displayOrder?: number,
    public category?: string,
    public focusStageNumber?: number,
    public stageCount?: number,
    public visible?: boolean
  ) {
    this.enabled = this.enabled || false;
    this.visible = this.visible || false;
  }
}
