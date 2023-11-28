import { IExerciseOrModality } from 'app/shared/model/exercise-or-modality.model';
import { IClinic } from 'app/shared/model/clinic.model';

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
