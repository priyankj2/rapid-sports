import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BalancePercentileComponent } from './balance-percentile.component';
import { BalancePercentileDetailComponent } from './balance-percentile-detail.component';
import { BalancePercentileUpdateComponent } from './balance-percentile-update.component';
import { BalancePercentileDeleteDialogComponent } from './balance-percentile-delete-dialog.component';
import { balancePercentileRoute } from './balance-percentile.route';
import { RapidSharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [RapidSharedModule, RouterModule.forChild(balancePercentileRoute)],
  declarations: [
    BalancePercentileComponent,
    BalancePercentileDetailComponent,
    BalancePercentileUpdateComponent,
    BalancePercentileDeleteDialogComponent
  ],
  entryComponents: [BalancePercentileDeleteDialogComponent]
})
export class RapidBalancePercentileModule {}
