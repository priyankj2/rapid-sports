import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAssessment } from 'app/shared/model/assessment.model';
import { AssessmentService } from './assessment.service';

@Component({
  templateUrl: './assessment-delete-dialog.component.html'
})
export class AssessmentDeleteDialogComponent {
  assessment?: IAssessment;

  constructor(
    protected assessmentService: AssessmentService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.assessmentService.delete(id).subscribe(() => {
      this.eventManager.broadcast('assessmentListModification');
      this.activeModal.close();
    });
  }
}
