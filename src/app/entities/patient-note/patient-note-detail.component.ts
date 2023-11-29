import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPatientNote } from '../../shared/model/patient-note.model';


@Component({
  selector: 'jhi-patient-note-detail',
  templateUrl: './patient-note-detail.component.html'
})
export class PatientNoteDetailComponent implements OnInit {
  patientNote: IPatientNote | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ patientNote }) => (this.patientNote = patientNote));
  }

  previousState(): void {
    window.history.back();
  }
}
