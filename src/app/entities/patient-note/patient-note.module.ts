import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PatientNoteComponent } from './patient-note.component';
import { PatientNoteDetailComponent } from './patient-note-detail.component';
import { PatientNoteUpdateComponent } from './patient-note-update.component';
import { PatientNoteDeleteDialogComponent } from './patient-note-delete-dialog.component';
import { patientNoteRoute } from './patient-note.route';
import { RapidSharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [RapidSharedModule, RouterModule.forChild(patientNoteRoute)],
  declarations: [PatientNoteComponent, PatientNoteDetailComponent, PatientNoteUpdateComponent, PatientNoteDeleteDialogComponent],
  entryComponents: [PatientNoteDeleteDialogComponent]
})
export class RapidPatientNoteModule {}
