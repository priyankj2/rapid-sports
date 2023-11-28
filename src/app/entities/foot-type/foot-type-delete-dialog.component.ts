import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFootType } from 'app/shared/model/foot-type.model';
import { FootTypeService } from './foot-type.service';

@Component({
  templateUrl: './foot-type-delete-dialog.component.html'
})
export class FootTypeDeleteDialogComponent {
  footType?: IFootType;

  constructor(protected footTypeService: FootTypeService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.footTypeService.delete(id).subscribe(() => {
      this.eventManager.broadcast('footTypeListModification');
      this.activeModal.close();
    });
  }
}
