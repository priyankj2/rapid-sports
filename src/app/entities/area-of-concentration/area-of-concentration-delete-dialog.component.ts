import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AreaOfConcentrationService } from './area-of-concentration.service';
import { IAreaOfConcentration } from '../../shared/model/area-of-concentration.model';

@Component({
  templateUrl: './area-of-concentration-delete-dialog.component.html'
})
export class AreaOfConcentrationDeleteDialogComponent {
  areaOfConcentration?: IAreaOfConcentration;

  constructor(
    protected areaOfConcentrationService: AreaOfConcentrationService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.areaOfConcentrationService.delete(id).subscribe(() => {
      this.eventManager.broadcast('areaOfConcentrationListModification');
      this.activeModal.close();
    });
  }
}
