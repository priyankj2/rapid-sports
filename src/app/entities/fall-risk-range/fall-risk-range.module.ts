import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RapidSharedModule } from 'app/shared/shared.module';
import { FallRiskRangeComponent } from './fall-risk-range.component';
import { FallRiskRangeDetailComponent } from './fall-risk-range-detail.component';
import { FallRiskRangeUpdateComponent } from './fall-risk-range-update.component';
import { FallRiskRangeDeleteDialogComponent } from './fall-risk-range-delete-dialog.component';
import { fallRiskRangeRoute } from './fall-risk-range.route';

@NgModule({
  imports: [RapidSharedModule, RouterModule.forChild(fallRiskRangeRoute)],
  declarations: [FallRiskRangeComponent, FallRiskRangeDetailComponent, FallRiskRangeUpdateComponent, FallRiskRangeDeleteDialogComponent],
  entryComponents: [FallRiskRangeDeleteDialogComponent]
})
export class RapidFallRiskRangeModule {}
