import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IExerciseAssignment } from 'app/shared/model/exercise-assignment.model';
import { ExerciseAssignmentService } from './exercise-assignment.service';

@Component({
  templateUrl: './exercise-assignment-delete-dialog.component.html'
})
export class ExerciseAssignmentDeleteDialogComponent {
  exerciseAssignment?: IExerciseAssignment;

  constructor(
    protected exerciseAssignmentService: ExerciseAssignmentService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.exerciseAssignmentService.delete(id).subscribe(() => {
      this.eventManager.broadcast('exerciseAssignmentListModification');
      this.activeModal.close();
    });
  }
}
