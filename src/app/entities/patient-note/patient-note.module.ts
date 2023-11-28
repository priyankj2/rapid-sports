import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RapidSharedModule } from 'app/shared/shared.module';
import { PatientNoteComponent } from './patient-note.component';
import { PatientNoteDetailComponent } from './patient-note-detail.component';
import { PatientNoteUpdateComponent } from './patient-note-update.component';
import { PatientNoteDeleteDialogComponent } from './patient-note-delete-dialog.component';
import { patientNoteRoute } from './patient-note.route';

@NgModule({
  imports: [RapidSharedModule, RouterModule.forChild(patientNoteRoute)],
  declarations: [PatientNoteComponent, PatientNoteDetailComponent, PatientNoteUpdateComponent, PatientNoteDeleteDialogComponent],
  entryComponents: [PatientNoteDeleteDialogComponent]
})
export class RapidPatientNoteModule {}
