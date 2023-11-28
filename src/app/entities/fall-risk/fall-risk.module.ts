import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RapidSharedModule } from 'app/shared/shared.module';
import { FallRiskComponent } from './fall-risk.component';
import { FallRiskDetailComponent } from './fall-risk-detail.component';
import { FallRiskUpdateComponent } from './fall-risk-update.component';
import { FallRiskDeleteDialogComponent } from './fall-risk-delete-dialog.component';
import { fallRiskRoute } from './fall-risk.route';

@NgModule({
  imports: [RapidSharedModule, RouterModule.forChild(fallRiskRoute)],
  declarations: [FallRiskComponent, FallRiskDetailComponent, FallRiskUpdateComponent, FallRiskDeleteDialogComponent],
  entryComponents: [FallRiskDeleteDialogComponent]
})
export class RapidFallRiskModule {}
