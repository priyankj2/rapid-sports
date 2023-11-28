import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RapidSharedModule } from 'app/shared/shared.module';
import { FootDecodingMeasurementComponent } from './foot-decoding-measurement.component';
import { FootDecodingMeasurementDetailComponent } from './foot-decoding-measurement-detail.component';
import { FootDecodingMeasurementUpdateComponent } from './foot-decoding-measurement-update.component';
import { FootDecodingMeasurementDeleteDialogComponent } from './foot-decoding-measurement-delete-dialog.component';
import { footDecodingMeasurementRoute } from './foot-decoding-measurement.route';

@NgModule({
  imports: [RapidSharedModule, RouterModule.forChild(footDecodingMeasurementRoute)],
  declarations: [
    FootDecodingMeasurementComponent,
    FootDecodingMeasurementDetailComponent,
    FootDecodingMeasurementUpdateComponent,
    FootDecodingMeasurementDeleteDialogComponent
  ],
  entryComponents: [FootDecodingMeasurementDeleteDialogComponent]
})
export class RapidFootDecodingMeasurementModule {}
