import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RapidSharedModule } from 'app/shared/shared.module';
import { ConditionComponent } from './condition.component';
import { ConditionDetailComponent } from './condition-detail.component';
import { ConditionUpdateComponent } from './condition-update.component';
import { ConditionDeleteDialogComponent } from './condition-delete-dialog.component';
import { conditionRoute } from './condition.route';

@NgModule({
  imports: [RapidSharedModule, RouterModule.forChild(conditionRoute)],
  declarations: [ConditionComponent, ConditionDetailComponent, ConditionUpdateComponent, ConditionDeleteDialogComponent],
  entryComponents: [ConditionDeleteDialogComponent]
})
export class RapidConditionModule {}
