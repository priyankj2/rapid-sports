import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICareProvider } from 'app/shared/model/care-provider.model';
import { CareProviderService } from './care-provider.service';

@Component({
  templateUrl: './care-provider-delete-dialog.component.html'
})
export class CareProviderDeleteDialogComponent {
  careProvider?: ICareProvider;

  constructor(
    protected careProviderService: CareProviderService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.careProviderService.delete(id).subscribe(() => {
      this.eventManager.broadcast('careProviderListModification');
      this.activeModal.close();
    });
  }
}
