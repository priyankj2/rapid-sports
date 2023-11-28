import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RapidSharedModule } from 'app/shared/shared.module';
import { FootTypeComponent } from './foot-type.component';
import { FootTypeDetailComponent } from './foot-type-detail.component';
import { FootTypeUpdateComponent } from './foot-type-update.component';
import { FootTypeDeleteDialogComponent } from './foot-type-delete-dialog.component';
import { footTypeRoute } from './foot-type.route';

@NgModule({
  imports: [RapidSharedModule, RouterModule.forChild(footTypeRoute)],
  declarations: [FootTypeComponent, FootTypeDetailComponent, FootTypeUpdateComponent, FootTypeDeleteDialogComponent],
  entryComponents: [FootTypeDeleteDialogComponent]
})
export class RapidFootTypeModule {}
