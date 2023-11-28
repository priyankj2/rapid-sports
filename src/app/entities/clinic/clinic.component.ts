import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { IClinic } from 'app/shared/model/clinic.model';
import { ClinicService } from './clinic.service';
import { ClinicDeleteDialogComponent } from './clinic-delete-dialog.component';

@Component({
  selector: 'jhi-clinic',
  templateUrl: './clinic.component.html'
})
export class ClinicComponent implements OnInit, OnDestroy {
  clinics?: IClinic[];
  eventSubscriber?: Subscription;

  constructor(protected clinicService: ClinicService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.clinicService.query().subscribe((res: HttpResponse<IClinic[]>) => (this.clinics = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInClinics();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  calculateLicenseTimeSpan(startDate: any, endDate: any): any {
    const start = moment(startDate);
    const end = moment(endDate);
    let timeSpan = '';
    const years = end.diff(start, 'year');
    start.add(years, 'years');
    if (years > 0) {
      timeSpan = years + ' years ';
    }

    const months = end.diff(start, 'months');
    start.add(months, 'months');

    if (months > 0) {
      timeSpan += months + ' months ';
    }
    const days = end.diff(start, 'days');
    if (days > 0) {
      timeSpan += days + ' days ';
    }

    return timeSpan;
  }

  trackId(index: number, item: IClinic): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInClinics(): void {
    this.eventSubscriber = this.eventManager.subscribe('clinicListModification', () => this.loadAll());
  }

  delete(clinic: IClinic): void {
    const modalRef = this.modalService.open(ClinicDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.clinic = clinic;
  }
}
