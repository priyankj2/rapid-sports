import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAgeGroup } from 'app/shared/model/age-group.model';
import { AgeGroupService } from './age-group.service';

@Component({
  templateUrl: './age-group-delete-dialog.component.html'
})
export class AgeGroupDeleteDialogComponent {
  ageGroup?: IAgeGroup;

  constructor(protected ageGroupService: AgeGroupService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.ageGroupService.delete(id).subscribe(() => {
      this.eventManager.broadcast('ageGroupListModification');
      this.activeModal.close();
    });
  }
}
