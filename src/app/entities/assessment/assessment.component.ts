import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AssessmentService } from './assessment.service';
import { AssessmentDeleteDialogComponent } from './assessment-delete-dialog.component';
import { IAssessment } from '../../shared/model/assessment.model';

@Component({
  selector: 'jhi-assessment',
  templateUrl: './assessment.component.html'
})
export class AssessmentComponent implements OnInit, OnDestroy {
  assessments?: IAssessment[];
  eventSubscriber?: Subscription;

  constructor(protected assessmentService: AssessmentService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.assessmentService.query().subscribe((res: HttpResponse<IAssessment[]>) => (this.assessments = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInAssessments();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IAssessment): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInAssessments(): void {
    this.eventSubscriber = this.eventManager.subscribe('assessmentListModification', () => this.loadAll());
  }

  delete(assessment: IAssessment): void {
    const modalRef = this.modalService.open(AssessmentDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.assessment = assessment;
  }
}
