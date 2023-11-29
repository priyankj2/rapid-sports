import { IClinic } from "./clinic.model";
import { IExerciseOrModality } from "./exercise-or-modality.model";

export interface ISupportingVideo {
  id?: number;
  label?: string;
  videoUrl?: string;
  imageUrl?: string;
  exerciseOrModality?: IExerciseOrModality;
  clinic?: IClinic;
}

export class SupportingVideo implements ISupportingVideo {
  constructor(
    public id?: number,
    public label?: string,
    public videoUrl?: string,
    public imageUrl?: string,
    public exerciseOrModality?: IExerciseOrModality,
    public clinic?: IClinic
  ) {}
}
