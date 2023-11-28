import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISupportingVideo } from 'app/shared/model/supporting-video.model';

@Component({
  selector: 'jhi-supporting-video-detail',
  templateUrl: './supporting-video-detail.component.html'
})
export class SupportingVideoDetailComponent implements OnInit {
  supportingVideo: ISupportingVideo | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ supportingVideo }) => (this.supportingVideo = supportingVideo));
  }

  previousState(): void {
    window.history.back();
  }
}
