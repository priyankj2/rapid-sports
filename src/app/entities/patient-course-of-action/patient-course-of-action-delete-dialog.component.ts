import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPatientCourseOfAction } from 'app/shared/model/patient-course-of-action.model';
import { PatientCourseOfActionService } from './patient-course-of-action.service';

@Component({
  templateUrl: './patient-course-of-action-delete-dialog.component.html'
})
export class PatientCourseOfActionDeleteDialogComponent {
  patientCourseOfAction?: IPatientCourseOfAction;

  constructor(
    protected patientCourseOfActionService: PatientCourseOfActionService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.patientCourseOfActionService.delete(id).subscribe(() => {
      this.eventManager.broadcast('patientCourseOfActionListModification');
      this.activeModal.close();
    });
  }
}
