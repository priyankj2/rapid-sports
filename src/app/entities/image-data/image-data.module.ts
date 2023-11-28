import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RapidSharedModule } from 'app/shared/shared.module';
import { ImageDataComponent } from './image-data.component';
import { ImageDataDetailComponent } from './image-data-detail.component';
import { ImageDataUpdateComponent } from './image-data-update.component';
import { ImageDataDeleteDialogComponent } from './image-data-delete-dialog.component';
import { imageDataRoute } from './image-data.route';

@NgModule({
  imports: [RapidSharedModule, RouterModule.forChild(imageDataRoute)],
  declarations: [ImageDataComponent, ImageDataDetailComponent, ImageDataUpdateComponent, ImageDataDeleteDialogComponent],
  entryComponents: [ImageDataDeleteDialogComponent]
})
export class RapidImageDataModule {}
