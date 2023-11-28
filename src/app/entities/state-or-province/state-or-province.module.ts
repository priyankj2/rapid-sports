import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RapidSharedModule } from 'app/shared/shared.module';
import { StateOrProvinceComponent } from './state-or-province.component';
import { StateOrProvinceDetailComponent } from './state-or-province-detail.component';
import { StateOrProvinceUpdateComponent } from './state-or-province-update.component';
import { StateOrProvinceDeleteDialogComponent } from './state-or-province-delete-dialog.component';
import { stateOrProvinceRoute } from './state-or-province.route';

@NgModule({
  imports: [RapidSharedModule, RouterModule.forChild(stateOrProvinceRoute)],
  declarations: [
    StateOrProvinceComponent,
    StateOrProvinceDetailComponent,
    StateOrProvinceUpdateComponent,
    StateOrProvinceDeleteDialogComponent
  ],
  entryComponents: [StateOrProvinceDeleteDialogComponent]
})
export class RapidStateOrProvinceModule {}
