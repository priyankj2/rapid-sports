import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IPatientNote } from '../../model/patient-note.model';

@Component({
  selector: 'jhi-patient-note-edit-form',
  templateUrl: './patient-note-edit-form.component.html',
  styleUrls: ['./patient-note-edit-form.component.scss']
})
export class PatientNoteEditFormComponent {
  public active = false;
  public editForm: FormGroup = new FormGroup({
    noteText: new FormControl('', Validators.required)
  });

  @Input() public isNew = false;

  @Input()
  public set model(note: IPatientNote) {
    this.editForm.reset(note);

    this.active = note !== undefined;
  }

  @Output() cancel: EventEmitter<any> = new EventEmitter();
  @Output() save: EventEmitter<IPatientNote> = new EventEmitter();

  public onSave(e: any): void {
    e.preventDefault();
    this.save.emit(this.editForm.value);
    this.active = false;
  }

  public onCancel(e: any): void {
    e.preventDefault();
    this.closeForm();
  }

  public closeForm(): void {
    this.active = false;
    this.cancel.emit();
  }
}
