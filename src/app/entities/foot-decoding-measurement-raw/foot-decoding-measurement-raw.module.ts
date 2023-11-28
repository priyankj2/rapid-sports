import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RapidSharedModule } from 'app/shared/shared.module';
import { FootDecodingMeasurementRawComponent } from './foot-decoding-measurement-raw.component';
import { FootDecodingMeasurementRawDetailComponent } from './foot-decoding-measurement-raw-detail.component';
import { FootDecodingMeasurementRawUpdateComponent } from './foot-decoding-measurement-raw-update.component';
import { FootDecodingMeasurementRawDeleteDialogComponent } from './foot-decoding-measurement-raw-delete-dialog.component';
import { footDecodingMeasurementRawRoute } from './foot-decoding-measurement-raw.route';

@NgModule({
  imports: [RapidSharedModule, RouterModule.forChild(footDecodingMeasurementRawRoute)],
  declarations: [
    FootDecodingMeasurementRawComponent,
    FootDecodingMeasurementRawDetailComponent,
    FootDecodingMeasurementRawUpdateComponent,
    FootDecodingMeasurementRawDeleteDialogComponent
  ],
  entryComponents: [FootDecodingMeasurementRawDeleteDialogComponent]
})
export class RapidFootDecodingMeasurementRawModule {}
