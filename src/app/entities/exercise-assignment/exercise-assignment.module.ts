import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RapidSharedModule } from 'app/shared/shared.module';
import { ExerciseAssignmentComponent } from './exercise-assignment.component';
import { ExerciseAssignmentDetailComponent } from './exercise-assignment-detail.component';
import { ExerciseAssignmentUpdateComponent } from './exercise-assignment-update.component';
import { ExerciseAssignmentDeleteDialogComponent } from './exercise-assignment-delete-dialog.component';
import { exerciseAssignmentRoute } from './exercise-assignment.route';

@NgModule({
  imports: [RapidSharedModule, RouterModule.forChild(exerciseAssignmentRoute)],
  declarations: [
    ExerciseAssignmentComponent,
    ExerciseAssignmentDetailComponent,
    ExerciseAssignmentUpdateComponent,
    ExerciseAssignmentDeleteDialogComponent
  ],
  entryComponents: [ExerciseAssignmentDeleteDialogComponent]
})
export class RapidExerciseAssignmentModule {}
