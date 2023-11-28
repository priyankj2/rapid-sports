import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IAreaOfConcentration } from 'app/shared/model/area-of-concentration.model';
import { AreaOfConcentrationService } from './area-of-concentration.service';
import { AreaOfConcentrationDeleteDialogComponent } from './area-of-concentration-delete-dialog.component';

@Component({
  selector: 'jhi-area-of-concentration',
  templateUrl: './area-of-concentration.component.html'
})
export class AreaOfConcentrationComponent implements OnInit, OnDestroy {
  areaOfConcentrations?: IAreaOfConcentration[];
  eventSubscriber?: Subscription;

  constructor(
    protected areaOfConcentrationService: AreaOfConcentrationService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.areaOfConcentrationService
      .query()
      .subscribe((res: HttpResponse<IAreaOfConcentration[]>) => (this.areaOfConcentrations = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInAreaOfConcentrations();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IAreaOfConcentration): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInAreaOfConcentrations(): void {
    this.eventSubscriber = this.eventManager.subscribe('areaOfConcentrationListModification', () => this.loadAll());
  }

  delete(areaOfConcentration: IAreaOfConcentration): void {
    const modalRef = this.modalService.open(AreaOfConcentrationDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.areaOfConcentration = areaOfConcentration;
  }
}
