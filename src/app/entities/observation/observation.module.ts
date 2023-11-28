import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RapidSharedModule } from 'app/shared/shared.module';
import { ObservationComponent } from './observation.component';
import { ObservationDetailComponent } from './observation-detail.component';
import { ObservationUpdateComponent } from './observation-update.component';
import { ObservationDeleteDialogComponent } from './observation-delete-dialog.component';
import { observationRoute } from './observation.route';

@NgModule({
  imports: [RapidSharedModule, RouterModule.forChild(observationRoute)],
  declarations: [ObservationComponent, ObservationDetailComponent, ObservationUpdateComponent, ObservationDeleteDialogComponent],
  entryComponents: [ObservationDeleteDialogComponent]
})
export class RapidObservationModule {}
