import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ISupportingVideo, SupportingVideo } from 'app/shared/model/supporting-video.model';
import { SupportingVideoService } from './supporting-video.service';
import { SupportingVideoComponent } from './supporting-video.component';
import { SupportingVideoDetailComponent } from './supporting-video-detail.component';
import { SupportingVideoUpdateComponent } from './supporting-video-update.component';

@Injectable({ providedIn: 'root' })
export class SupportingVideoResolve implements Resolve<ISupportingVideo> {
  constructor(private service: SupportingVideoService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISupportingVideo> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((supportingVideo: HttpResponse<SupportingVideo>) => {
          if (supportingVideo.body) {
            return of(supportingVideo.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new SupportingVideo());
  }
}

export const supportingVideoRoute: Routes = [
  {
    path: '',
    component: SupportingVideoComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rapidApp.supportingVideo.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: SupportingVideoDetailComponent,
    resolve: {
      supportingVideo: SupportingVideoResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rapidApp.supportingVideo.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: SupportingVideoUpdateComponent,
    resolve: {
      supportingVideo: SupportingVideoResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rapidApp.supportingVideo.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: SupportingVideoUpdateComponent,
    resolve: {
      supportingVideo: SupportingVideoResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rapidApp.supportingVideo.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
