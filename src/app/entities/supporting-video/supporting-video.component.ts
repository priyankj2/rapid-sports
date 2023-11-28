import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISupportingVideo } from 'app/shared/model/supporting-video.model';
import { SupportingVideoService } from './supporting-video.service';
import { SupportingVideoDeleteDialogComponent } from './supporting-video-delete-dialog.component';

@Component({
  selector: 'jhi-supporting-video',
  templateUrl: './supporting-video.component.html'
})
export class SupportingVideoComponent implements OnInit, OnDestroy {
  supportingVideos?: ISupportingVideo[];
  eventSubscriber?: Subscription;

  constructor(
    protected supportingVideoService: SupportingVideoService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.supportingVideoService.query().subscribe((res: HttpResponse<ISupportingVideo[]>) => (this.supportingVideos = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInSupportingVideos();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ISupportingVideo): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInSupportingVideos(): void {
    this.eventSubscriber = this.eventManager.subscribe('supportingVideoListModification', () => this.loadAll());
  }

  delete(supportingVideo: ISupportingVideo): void {
    const modalRef = this.modalService.open(SupportingVideoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.supportingVideo = supportingVideo;
  }
}
