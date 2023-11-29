import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PatientNoteService } from './patient-note.service';
import { IPatientNote } from '../../shared/model/patient-note.model';

@Component({
  templateUrl: './patient-note-delete-dialog.component.html'
})
export class PatientNoteDeleteDialogComponent {
  patientNote?: IPatientNote;

  constructor(
    protected patientNoteService: PatientNoteService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.patientNoteService.delete(id).subscribe(() => {
      this.eventManager.broadcast('patientNoteListModification');
      this.activeModal.close();
    });
  }
}
