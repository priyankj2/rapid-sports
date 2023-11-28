import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IAgeGroup } from 'app/shared/model/age-group.model';
import { AgeGroupService } from './age-group.service';
import { AgeGroupDeleteDialogComponent } from './age-group-delete-dialog.component';

@Component({
  selector: 'jhi-age-group',
  templateUrl: './age-group.component.html'
})
export class AgeGroupComponent implements OnInit, OnDestroy {
  ageGroups?: IAgeGroup[];
  eventSubscriber?: Subscription;

  constructor(protected ageGroupService: AgeGroupService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.ageGroupService.query().subscribe((res: HttpResponse<IAgeGroup[]>) => (this.ageGroups = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInAgeGroups();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IAgeGroup): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInAgeGroups(): void {
    this.eventSubscriber = this.eventManager.subscribe('ageGroupListModification', () => this.loadAll());
  }

  delete(ageGroup: IAgeGroup): void {
    const modalRef = this.modalService.open(AgeGroupDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.ageGroup = ageGroup;
  }
}
