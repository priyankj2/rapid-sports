import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RapidSharedModule } from 'app/shared/shared.module';
import { CourseOfActionMappingComponent } from './course-of-action-mapping.component';
import { CourseOfActionMappingDetailComponent } from './course-of-action-mapping-detail.component';
import { CourseOfActionMappingUpdateComponent } from './course-of-action-mapping-update.component';
import { CourseOfActionMappingDeleteDialogComponent } from './course-of-action-mapping-delete-dialog.component';
import { courseOfActionMappingRoute } from './course-of-action-mapping.route';

@NgModule({
  imports: [RapidSharedModule, RouterModule.forChild(courseOfActionMappingRoute)],
  declarations: [
    CourseOfActionMappingComponent,
    CourseOfActionMappingDetailComponent,
    CourseOfActionMappingUpdateComponent,
    CourseOfActionMappingDeleteDialogComponent
  ],
  entryComponents: [CourseOfActionMappingDeleteDialogComponent]
})
export class RapidCourseOfActionMappingModule {}
