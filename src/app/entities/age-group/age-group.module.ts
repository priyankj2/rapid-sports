import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AgeGroupComponent } from './age-group.component';
import { AgeGroupDetailComponent } from './age-group-detail.component';
import { AgeGroupUpdateComponent } from './age-group-update.component';
import { AgeGroupDeleteDialogComponent } from './age-group-delete-dialog.component';
import { ageGroupRoute } from './age-group.route';
import { RapidSharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [RapidSharedModule, RouterModule.forChild(ageGroupRoute)],
  declarations: [AgeGroupComponent, AgeGroupDetailComponent, AgeGroupUpdateComponent, AgeGroupDeleteDialogComponent],
  entryComponents: [AgeGroupDeleteDialogComponent]
})
export class RapidAgeGroupModule {}
