import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICondition } from 'app/shared/model/condition.model';
import { ConditionService } from './condition.service';
import { ConditionDeleteDialogComponent } from './condition-delete-dialog.component';

@Component({
  selector: 'jhi-condition',
  templateUrl: './condition.component.html'
})
export class ConditionComponent implements OnInit, OnDestroy {
  conditions?: ICondition[];
  eventSubscriber?: Subscription;

  constructor(protected conditionService: ConditionService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.conditionService.query().subscribe((res: HttpResponse<ICondition[]>) => (this.conditions = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInConditions();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICondition): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInConditions(): void {
    this.eventSubscriber = this.eventManager.subscribe('conditionListModification', () => this.loadAll());
  }

  delete(condition: ICondition): void {
    const modalRef = this.modalService.open(ConditionDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.condition = condition;
  }
}
