import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IImageData, ImageData } from 'app/shared/model/image-data.model';
import { ImageDataService } from './image-data.service';
import { ImageDataComponent } from './image-data.component';
import { ImageDataDetailComponent } from './image-data-detail.component';
import { ImageDataUpdateComponent } from './image-data-update.component';

@Injectable({ providedIn: 'root' })
export class ImageDataResolve implements Resolve<IImageData> {
  constructor(private service: ImageDataService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IImageData> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((imageData: HttpResponse<ImageData>) => {
          if (imageData.body) {
            return of(imageData.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ImageData());
  }
}

export const imageDataRoute: Routes = [
  {
    path: '',
    component: ImageDataComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rapidApp.imageData.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ImageDataDetailComponent,
    resolve: {
      imageData: ImageDataResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rapidApp.imageData.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ImageDataUpdateComponent,
    resolve: {
      imageData: ImageDataResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rapidApp.imageData.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ImageDataUpdateComponent,
    resolve: {
      imageData: ImageDataResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rapidApp.imageData.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
