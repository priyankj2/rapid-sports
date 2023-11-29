import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { BalancePercentileService } from './balance-percentile.service';
import { IBalancePercentile } from '../../shared/model/balance-percentile.model';

@Component({
  templateUrl: './balance-percentile-delete-dialog.component.html'
})
export class BalancePercentileDeleteDialogComponent {
  balancePercentile?: IBalancePercentile;

  constructor(
    protected balancePercentileService: BalancePercentileService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.balancePercentileService.delete(id).subscribe(() => {
      this.eventManager.broadcast('balancePercentileListModification');
      this.activeModal.close();
    });
  }
}
