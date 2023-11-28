import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IExerciseAssignment } from 'app/shared/model/exercise-assignment.model';
import { ExerciseAssignmentService } from './exercise-assignment.service';
import { ExerciseAssignmentDeleteDialogComponent } from './exercise-assignment-delete-dialog.component';

@Component({
  selector: 'jhi-exercise-assignment',
  templateUrl: './exercise-assignment.component.html'
})
export class ExerciseAssignmentComponent implements OnInit, OnDestroy {
  exerciseAssignments?: IExerciseAssignment[];
  eventSubscriber?: Subscription;

  constructor(
    protected exerciseAssignmentService: ExerciseAssignmentService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.exerciseAssignmentService
      .query()
      .subscribe((res: HttpResponse<IExerciseAssignment[]>) => (this.exerciseAssignments = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInExerciseAssignments();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IExerciseAssignment): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInExerciseAssignments(): void {
    this.eventSubscriber = this.eventManager.subscribe('exerciseAssignmentListModification', () => this.loadAll());
  }

  delete(exerciseAssignment: IExerciseAssignment): void {
    const modalRef = this.modalService.open(ExerciseAssignmentDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.exerciseAssignment = exerciseAssignment;
  }
}
