import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IFootType } from 'app/shared/model/foot-type.model';
import { FootTypeService } from './foot-type.service';
import { FootTypeDeleteDialogComponent } from './foot-type-delete-dialog.component';

@Component({
  selector: 'jhi-foot-type',
  templateUrl: './foot-type.component.html'
})
export class FootTypeComponent implements OnInit, OnDestroy {
  footTypes?: IFootType[];
  eventSubscriber?: Subscription;

  constructor(protected footTypeService: FootTypeService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.footTypeService.query().subscribe((res: HttpResponse<IFootType[]>) => (this.footTypes = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInFootTypes();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IFootType): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInFootTypes(): void {
    this.eventSubscriber = this.eventManager.subscribe('footTypeListModification', () => this.loadAll());
  }

  delete(footType: IFootType): void {
    const modalRef = this.modalService.open(FootTypeDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.footType = footType;
  }
}
