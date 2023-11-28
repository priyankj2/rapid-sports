import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IFootDecodingMeasurement } from 'app/shared/model/foot-decoding-measurement.model';
import { FootDecodingMeasurementService } from './foot-decoding-measurement.service';
import { FootDecodingMeasurementDeleteDialogComponent } from './foot-decoding-measurement-delete-dialog.component';

@Component({
  selector: 'jhi-foot-decoding-measurement',
  templateUrl: './foot-decoding-measurement.component.html'
})
export class FootDecodingMeasurementComponent implements OnInit, OnDestroy {
  footDecodingMeasurements?: IFootDecodingMeasurement[];
  eventSubscriber?: Subscription;

  constructor(
    protected footDecodingMeasurementService: FootDecodingMeasurementService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.footDecodingMeasurementService
      .query()
      .subscribe((res: HttpResponse<IFootDecodingMeasurement[]>) => (this.footDecodingMeasurements = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInFootDecodingMeasurements();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IFootDecodingMeasurement): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInFootDecodingMeasurements(): void {
    this.eventSubscriber = this.eventManager.subscribe('footDecodingMeasurementListModification', () => this.loadAll());
  }

  delete(footDecodingMeasurement: IFootDecodingMeasurement): void {
    const modalRef = this.modalService.open(FootDecodingMeasurementDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.footDecodingMeasurement = footDecodingMeasurement;
  }
}
