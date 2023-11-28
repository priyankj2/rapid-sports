import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IFootDecodingMeasurementRaw, FootDecodingMeasurementRaw } from 'app/shared/model/foot-decoding-measurement-raw.model';
import { FootDecodingMeasurementRawService } from './foot-decoding-measurement-raw.service';
import { FootDecodingMeasurementRawComponent } from './foot-decoding-measurement-raw.component';
import { FootDecodingMeasurementRawDetailComponent } from './foot-decoding-measurement-raw-detail.component';
import { FootDecodingMeasurementRawUpdateComponent } from './foot-decoding-measurement-raw-update.component';

@Injectable({ providedIn: 'root' })
export class FootDecodingMeasurementRawResolve implements Resolve<IFootDecodingMeasurementRaw> {
  constructor(private service: FootDecodingMeasurementRawService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IFootDecodingMeasurementRaw> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((footDecodingMeasurementRaw: HttpResponse<FootDecodingMeasurementRaw>) => {
          if (footDecodingMeasurementRaw.body) {
            return of(footDecodingMeasurementRaw.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new FootDecodingMeasurementRaw());
  }
}

export const footDecodingMeasurementRawRoute: Routes = [
  {
    path: '',
    component: FootDecodingMeasurementRawComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rapidApp.footDecodingMeasurementRaw.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: FootDecodingMeasurementRawDetailComponent,
    resolve: {
      footDecodingMeasurementRaw: FootDecodingMeasurementRawResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rapidApp.footDecodingMeasurementRaw.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: FootDecodingMeasurementRawUpdateComponent,
    resolve: {
      footDecodingMeasurementRaw: FootDecodingMeasurementRawResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rapidApp.footDecodingMeasurementRaw.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: FootDecodingMeasurementRawUpdateComponent,
    resolve: {
      footDecodingMeasurementRaw: FootDecodingMeasurementRawResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rapidApp.footDecodingMeasurementRaw.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
