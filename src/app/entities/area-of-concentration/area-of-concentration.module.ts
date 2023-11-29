import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AreaOfConcentrationComponent } from './area-of-concentration.component';
import { AreaOfConcentrationDetailComponent } from './area-of-concentration-detail.component';
import { AreaOfConcentrationUpdateComponent } from './area-of-concentration-update.component';
import { AreaOfConcentrationDeleteDialogComponent } from './area-of-concentration-delete-dialog.component';
import { areaOfConcentrationRoute } from './area-of-concentration.route';
import { RapidSharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [RapidSharedModule, RouterModule.forChild(areaOfConcentrationRoute)],
  declarations: [
    AreaOfConcentrationComponent,
    AreaOfConcentrationDetailComponent,
    AreaOfConcentrationUpdateComponent,
    AreaOfConcentrationDeleteDialogComponent
  ],
  entryComponents: [AreaOfConcentrationDeleteDialogComponent]
})
export class RapidAreaOfConcentrationModule {}
