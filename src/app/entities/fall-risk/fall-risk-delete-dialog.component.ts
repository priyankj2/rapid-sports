import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFallRisk } from 'app/shared/model/fall-risk.model';
import { FallRiskService } from './fall-risk.service';

@Component({
  templateUrl: './fall-risk-delete-dialog.component.html'
})
export class FallRiskDeleteDialogComponent {
  fallRisk?: IFallRisk;

  constructor(protected fallRiskService: FallRiskService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.fallRiskService.delete(id).subscribe(() => {
      this.eventManager.broadcast('fallRiskListModification');
      this.activeModal.close();
    });
  }
}
