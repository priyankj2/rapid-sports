import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICourseOfActionMapping } from 'app/shared/model/course-of-action-mapping.model';
import { CourseOfActionMappingService } from './course-of-action-mapping.service';

@Component({
  templateUrl: './course-of-action-mapping-delete-dialog.component.html'
})
export class CourseOfActionMappingDeleteDialogComponent {
  courseOfActionMapping?: ICourseOfActionMapping;

  constructor(
    protected courseOfActionMappingService: CourseOfActionMappingService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.courseOfActionMappingService.delete(id).subscribe(() => {
      this.eventManager.broadcast('courseOfActionMappingListModification');
      this.activeModal.close();
    });
  }
}
