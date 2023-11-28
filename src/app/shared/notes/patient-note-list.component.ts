import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { IPatient } from 'app/shared/model/patient.model';
import { PatientNoteService } from 'app/entities/patient-note/patient-note.service';
import { Subscription } from 'rxjs';
import { IPatientNote, PatientNote } from 'app/shared/model/patient-note.model';

@Component({
  selector: 'jhi-patient-note-list',
  templateUrl: './patient-note-list.component.html',
  styleUrls: ['./patient-note-list.component.scss']
})
export class PatientNoteListComponent implements OnInit, OnDestroy {
  @Input()
  patient?: IPatient;
  patientNoteSubscription?: Subscription;
  notes: IPatientNote[] = [];
  loading = true;

  editDataItem?: IPatientNote;

  constructor(private patientNoteService: PatientNoteService) {}

  ngOnInit(): void {
    this.refresh();
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }

  createNewNote(): IPatientNote {
    return new PatientNote();
  }

  unsubscribe(): void {
    if (this.patientNoteSubscription) {
      this.patientNoteSubscription.unsubscribe();
    }
  }

  refresh(): void {
    this.loading = true;
    this.unsubscribe();
    this.patientNoteSubscription = this.patientNoteService.query({ patientId: this.patient?.id }).subscribe(response => {
      if (response.body) {
        this.notes = response.body;
      }
      this.loading = false;
    });
  }

  public addHandler(e: any): void {
    console.log(e);
    this.editDataItem = new PatientNote();
  }

  public cancelHandler(): void {
    this.editDataItem = undefined;
  }

  public saveHandler(note: IPatientNote): void {
    note.patient = this.patient;
    this.patientNoteService.create(note).subscribe(response => {
      console.log(response);

      this.refresh();
    });

    this.editDataItem = undefined;
  }
}
