import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RapidSharedModule } from 'app/shared/shared.module';
import { PatientCourseOfActionComponent } from './patient-course-of-action.component';
import { PatientCourseOfActionDetailComponent } from './patient-course-of-action-detail.component';
import { PatientCourseOfActionUpdateComponent } from './patient-course-of-action-update.component';
import { PatientCourseOfActionDeleteDialogComponent } from './patient-course-of-action-delete-dialog.component';
import { patientCourseOfActionRoute } from './patient-course-of-action.route';

@NgModule({
  imports: [RapidSharedModule, RouterModule.forChild(patientCourseOfActionRoute)],
  declarations: [
    PatientCourseOfActionComponent,
    PatientCourseOfActionDetailComponent,
    PatientCourseOfActionUpdateComponent,
    PatientCourseOfActionDeleteDialogComponent
  ],
  entryComponents: [PatientCourseOfActionDeleteDialogComponent]
})
export class RapidPatientCourseOfActionModule {}
