import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SupportingVideoService } from './supporting-video.service';
import { ISupportingVideo } from '../../shared/model/supporting-video.model';

@Component({
  templateUrl: './supporting-video-delete-dialog.component.html'
})
export class SupportingVideoDeleteDialogComponent {
  supportingVideo?: ISupportingVideo;

  constructor(
    protected supportingVideoService: SupportingVideoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.supportingVideoService.delete(id).subscribe(() => {
      this.eventManager.broadcast('supportingVideoListModification');
      this.activeModal.close();
    });
  }
}
