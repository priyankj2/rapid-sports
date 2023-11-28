import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IImageData } from 'app/shared/model/image-data.model';

@Component({
  selector: 'jhi-image-data-detail',
  templateUrl: './image-data-detail.component.html'
})
export class ImageDataDetailComponent implements OnInit {
  imageData: IImageData | null = null;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ imageData }) => (this.imageData = imageData));
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  previousState(): void {
    window.history.back();
  }
}
