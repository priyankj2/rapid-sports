import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IExerciseOrModality } from 'app/shared/model/exercise-or-modality.model';
import { ExerciseOrModalityService } from './exercise-or-modality.service';
import { ExerciseOrModalityDeleteDialogComponent } from './exercise-or-modality-delete-dialog.component';

@Component({
  selector: 'jhi-exercise-or-modality',
  templateUrl: './exercise-or-modality.component.html'
})
export class ExerciseOrModalityComponent implements OnInit, OnDestroy {
  exerciseOrModalities?: IExerciseOrModality[];
  eventSubscriber?: Subscription;

  constructor(
    protected exerciseOrModalityService: ExerciseOrModalityService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.exerciseOrModalityService
      .query()
      .subscribe((res: HttpResponse<IExerciseOrModality[]>) => (this.exerciseOrModalities = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInExerciseOrModalities();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IExerciseOrModality): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInExerciseOrModalities(): void {
    this.eventSubscriber = this.eventManager.subscribe('exerciseOrModalityListModification', () => this.loadAll());
  }

  delete(exerciseOrModality: IExerciseOrModality): void {
    const modalRef = this.modalService.open(ExerciseOrModalityDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.exerciseOrModality = exerciseOrModality;
  }
}
