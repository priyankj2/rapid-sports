import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICondition } from 'app/shared/model/condition.model';
import { ConditionService } from './condition.service';

@Component({
  templateUrl: './condition-delete-dialog.component.html'
})
export class ConditionDeleteDialogComponent {
  condition?: ICondition;

  constructor(protected conditionService: ConditionService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.conditionService.delete(id).subscribe(() => {
      this.eventManager.broadcast('conditionListModification');
      this.activeModal.close();
    });
  }
}
