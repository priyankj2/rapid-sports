import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


import { PatientNoteService } from './patient-note.service';
import { PatientNoteDeleteDialogComponent } from './patient-note-delete-dialog.component';
import { IPatientNote } from '../../shared/model/patient-note.model';

@Component({
  selector: 'jhi-patient-note',
  templateUrl: './patient-note.component.html'
})
export class PatientNoteComponent implements OnInit, OnDestroy {
  patientNotes?: IPatientNote[];
  eventSubscriber?: Subscription;

  constructor(
    protected patientNoteService: PatientNoteService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.patientNoteService.query().subscribe((res: HttpResponse<IPatientNote[]>) => (this.patientNotes = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInPatientNotes();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IPatientNote): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInPatientNotes(): void {
    this.eventSubscriber = this.eventManager.subscribe('patientNoteListModification', () => this.loadAll());
  }

  delete(patientNote: IPatientNote): void {
    const modalRef = this.modalService.open(PatientNoteDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.patientNote = patientNote;
  }
}
