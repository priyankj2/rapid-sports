import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IPatientCourseOfAction } from 'app/shared/model/patient-course-of-action.model';
import { PatientCourseOfActionService } from './patient-course-of-action.service';
import { PatientCourseOfActionDeleteDialogComponent } from './patient-course-of-action-delete-dialog.component';

@Component({
  selector: 'jhi-patient-course-of-action',
  templateUrl: './patient-course-of-action.component.html'
})
export class PatientCourseOfActionComponent implements OnInit, OnDestroy {
  patientCourseOfActions?: IPatientCourseOfAction[];
  eventSubscriber?: Subscription;

  constructor(
    protected patientCourseOfActionService: PatientCourseOfActionService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.patientCourseOfActionService
      .query()
      .subscribe((res: HttpResponse<IPatientCourseOfAction[]>) => (this.patientCourseOfActions = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInPatientCourseOfActions();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IPatientCourseOfAction): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInPatientCourseOfActions(): void {
    this.eventSubscriber = this.eventManager.subscribe('patientCourseOfActionListModification', () => this.loadAll());
  }

  delete(patientCourseOfAction: IPatientCourseOfAction): void {
    const modalRef = this.modalService.open(PatientCourseOfActionDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.patientCourseOfAction = patientCourseOfAction;
  }
}
