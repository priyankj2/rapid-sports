import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IFootDecodingMeasurementRaw } from 'app/shared/model/foot-decoding-measurement-raw.model';
import { FootDecodingMeasurementRawService } from './foot-decoding-measurement-raw.service';
import { FootDecodingMeasurementRawDeleteDialogComponent } from './foot-decoding-measurement-raw-delete-dialog.component';

@Component({
  selector: 'jhi-foot-decoding-measurement-raw',
  templateUrl: './foot-decoding-measurement-raw.component.html'
})
export class FootDecodingMeasurementRawComponent implements OnInit, OnDestroy {
  footDecodingMeasurementRaws?: IFootDecodingMeasurementRaw[];
  eventSubscriber?: Subscription;

  constructor(
    protected footDecodingMeasurementRawService: FootDecodingMeasurementRawService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.footDecodingMeasurementRawService
      .query()
      .subscribe((res: HttpResponse<IFootDecodingMeasurementRaw[]>) => (this.footDecodingMeasurementRaws = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInFootDecodingMeasurementRaws();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IFootDecodingMeasurementRaw): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInFootDecodingMeasurementRaws(): void {
    this.eventSubscriber = this.eventManager.subscribe('footDecodingMeasurementRawListModification', () => this.loadAll());
  }

  delete(footDecodingMeasurementRaw: IFootDecodingMeasurementRaw): void {
    const modalRef = this.modalService.open(FootDecodingMeasurementRawDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.footDecodingMeasurementRaw = footDecodingMeasurementRaw;
  }
}
