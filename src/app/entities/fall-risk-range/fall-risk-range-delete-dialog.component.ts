import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFallRiskRange } from 'app/shared/model/fall-risk-range.model';
import { FallRiskRangeService } from './fall-risk-range.service';

@Component({
  templateUrl: './fall-risk-range-delete-dialog.component.html'
})
export class FallRiskRangeDeleteDialogComponent {
  fallRiskRange?: IFallRiskRange;

  constructor(
    protected fallRiskRangeService: FallRiskRangeService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.fallRiskRangeService.delete(id).subscribe(() => {
      this.eventManager.broadcast('fallRiskRangeListModification');
      this.activeModal.close();
    });
  }
}
