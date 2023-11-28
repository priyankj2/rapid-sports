import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IExerciseOrModality } from 'app/shared/model/exercise-or-modality.model';
import { ExerciseOrModalityService } from './exercise-or-modality.service';

@Component({
  templateUrl: './exercise-or-modality-delete-dialog.component.html'
})
export class ExerciseOrModalityDeleteDialogComponent {
  exerciseOrModality?: IExerciseOrModality;

  constructor(
    protected exerciseOrModalityService: ExerciseOrModalityService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.exerciseOrModalityService.delete(id).subscribe(() => {
      this.eventManager.broadcast('exerciseOrModalityListModification');
      this.activeModal.close();
    });
  }
}
