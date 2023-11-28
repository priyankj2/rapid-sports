import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IImageData } from 'app/shared/model/image-data.model';
import { ImageDataService } from './image-data.service';

@Component({
  templateUrl: './image-data-delete-dialog.component.html'
})
export class ImageDataDeleteDialogComponent {
  imageData?: IImageData;

  constructor(protected imageDataService: ImageDataService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.imageDataService.delete(id).subscribe(() => {
      this.eventManager.broadcast('imageDataListModification');
      this.activeModal.close();
    });
  }
}
