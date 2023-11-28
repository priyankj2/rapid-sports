import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RapidSharedModule } from 'app/shared/shared.module';
import { ExerciseOrModalityComponent } from './exercise-or-modality.component';
import { ExerciseOrModalityDetailComponent } from './exercise-or-modality-detail.component';
import { ExerciseOrModalityUpdateComponent } from './exercise-or-modality-update.component';
import { ExerciseOrModalityDeleteDialogComponent } from './exercise-or-modality-delete-dialog.component';
import { exerciseOrModalityRoute } from './exercise-or-modality.route';

@NgModule({
  imports: [RapidSharedModule, RouterModule.forChild(exerciseOrModalityRoute)],
  declarations: [
    ExerciseOrModalityComponent,
    ExerciseOrModalityDetailComponent,
    ExerciseOrModalityUpdateComponent,
    ExerciseOrModalityDeleteDialogComponent
  ],
  entryComponents: [ExerciseOrModalityDeleteDialogComponent]
})
export class RapidExerciseOrModalityModule {}
