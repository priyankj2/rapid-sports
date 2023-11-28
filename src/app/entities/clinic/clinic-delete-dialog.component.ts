import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IClinic } from 'app/shared/model/clinic.model';
import { ClinicService } from './clinic.service';

@Component({
  templateUrl: './clinic-delete-dialog.component.html'
})
export class ClinicDeleteDialogComponent {
  clinic?: IClinic;

  constructor(protected clinicService: ClinicService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.clinicService.delete(id).subscribe(() => {
      this.eventManager.broadcast('clinicListModification');
      this.activeModal.close();
    });
  }
}
