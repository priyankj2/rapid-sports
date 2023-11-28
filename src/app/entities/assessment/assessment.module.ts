import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RapidSharedModule } from 'app/shared/shared.module';
import { AssessmentComponent } from './assessment.component';
import { AssessmentDetailComponent } from './assessment-detail.component';
import { AssessmentUpdateComponent } from './assessment-update.component';
import { AssessmentDeleteDialogComponent } from './assessment-delete-dialog.component';
import { assessmentRoute } from './assessment.route';

@NgModule({
  imports: [RapidSharedModule, RouterModule.forChild(assessmentRoute)],
  declarations: [AssessmentComponent, AssessmentDetailComponent, AssessmentUpdateComponent, AssessmentDeleteDialogComponent],
  entryComponents: [AssessmentDeleteDialogComponent]
})
export class RapidAssessmentModule {}
