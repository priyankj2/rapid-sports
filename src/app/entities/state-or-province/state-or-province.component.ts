import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IStateOrProvince } from 'app/shared/model/state-or-province.model';
import { StateOrProvinceService } from './state-or-province.service';
import { StateOrProvinceDeleteDialogComponent } from './state-or-province-delete-dialog.component';

@Component({
  selector: 'jhi-state-or-province',
  templateUrl: './state-or-province.component.html'
})
export class StateOrProvinceComponent implements OnInit, OnDestroy {
  stateOrProvinces?: IStateOrProvince[];
  eventSubscriber?: Subscription;

  constructor(
    protected stateOrProvinceService: StateOrProvinceService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.stateOrProvinceService.query().subscribe((res: HttpResponse<IStateOrProvince[]>) => (this.stateOrProvinces = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInStateOrProvinces();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IStateOrProvince): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInStateOrProvinces(): void {
    this.eventSubscriber = this.eventManager.subscribe('stateOrProvinceListModification', () => this.loadAll());
  }

  delete(stateOrProvince: IStateOrProvince): void {
    const modalRef = this.modalService.open(StateOrProvinceDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.stateOrProvince = stateOrProvince;
  }
}
