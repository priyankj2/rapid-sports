import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { StateOrProvinceService } from './state-or-province.service';
import { IStateOrProvince } from '../../shared/model/state-or-province.model';

@Component({
  templateUrl: './state-or-province-delete-dialog.component.html'
})
export class StateOrProvinceDeleteDialogComponent {
  stateOrProvince?: IStateOrProvince;

  constructor(
    protected stateOrProvinceService: StateOrProvinceService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.stateOrProvinceService.delete(id).subscribe(() => {
      this.eventManager.broadcast('stateOrProvinceListModification');
      this.activeModal.close();
    });
  }
}