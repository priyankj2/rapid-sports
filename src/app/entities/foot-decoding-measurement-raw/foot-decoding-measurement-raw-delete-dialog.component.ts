import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFootDecodingMeasurementRaw } from 'app/shared/model/foot-decoding-measurement-raw.model';
import { FootDecodingMeasurementRawService } from './foot-decoding-measurement-raw.service';

@Component({
  templateUrl: './foot-decoding-measurement-raw-delete-dialog.component.html'
})
export class FootDecodingMeasurementRawDeleteDialogComponent {
  footDecodingMeasurementRaw?: IFootDecodingMeasurementRaw;

  constructor(
    protected footDecodingMeasurementRawService: FootDecodingMeasurementRawService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.footDecodingMeasurementRawService.delete(id).subscribe(() => {
      this.eventManager.broadcast('footDecodingMeasurementRawListModification');
      this.activeModal.close();
    });
  }
}
