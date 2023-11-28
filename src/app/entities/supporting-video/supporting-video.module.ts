import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RapidSharedModule } from 'app/shared/shared.module';
import { SupportingVideoComponent } from './supporting-video.component';
import { SupportingVideoDetailComponent } from './supporting-video-detail.component';
import { SupportingVideoUpdateComponent } from './supporting-video-update.component';
import { SupportingVideoDeleteDialogComponent } from './supporting-video-delete-dialog.component';
import { supportingVideoRoute } from './supporting-video.route';

@NgModule({
  imports: [RapidSharedModule, RouterModule.forChild(supportingVideoRoute)],
  declarations: [
    SupportingVideoComponent,
    SupportingVideoDetailComponent,
    SupportingVideoUpdateComponent,
    SupportingVideoDeleteDialogComponent
  ],
  entryComponents: [SupportingVideoDeleteDialogComponent]
})
export class RapidSupportingVideoModule {}
