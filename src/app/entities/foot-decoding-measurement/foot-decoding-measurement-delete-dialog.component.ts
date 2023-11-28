import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFootDecodingMeasurement } from 'app/shared/model/foot-decoding-measurement.model';
import { FootDecodingMeasurementService } from './foot-decoding-measurement.service';

@Component({
  templateUrl: './foot-decoding-measurement-delete-dialog.component.html'
})
export class FootDecodingMeasurementDeleteDialogComponent {
  footDecodingMeasurement?: IFootDecodingMeasurement;

  constructor(
    protected footDecodingMeasurementService: FootDecodingMeasurementService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.footDecodingMeasurementService.delete(id).subscribe(() => {
      this.eventManager.broadcast('footDecodingMeasurementListModification');
      this.activeModal.close();
    });
  }
}
