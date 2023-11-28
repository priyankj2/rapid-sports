import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IFootDecodingMeasurement, FootDecodingMeasurement } from 'app/shared/model/foot-decoding-measurement.model';
import { FootDecodingMeasurementService } from './foot-decoding-measurement.service';
import { FootDecodingMeasurementComponent } from './foot-decoding-measurement.component';
import { FootDecodingMeasurementDetailComponent } from './foot-decoding-measurement-detail.component';
import { FootDecodingMeasurementUpdateComponent } from './foot-decoding-measurement-update.component';

@Injectable({ providedIn: 'root' })
export class FootDecodingMeasurementResolve implements Resolve<IFootDecodingMeasurement> {
  constructor(private service: FootDecodingMeasurementService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IFootDecodingMeasurement> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((footDecodingMeasurement: HttpResponse<FootDecodingMeasurement>) => {
          if (footDecodingMeasurement.body) {
            return of(footDecodingMeasurement.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new FootDecodingMeasurement());
  }
}

export const footDecodingMeasurementRoute: Routes = [
  {
    path: '',
    component: FootDecodingMeasurementComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rapidApp.footDecodingMeasurement.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: FootDecodingMeasurementDetailComponent,
    resolve: {
      footDecodingMeasurement: FootDecodingMeasurementResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rapidApp.footDecodingMeasurement.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: FootDecodingMeasurementUpdateComponent,
    resolve: {
      footDecodingMeasurement: FootDecodingMeasurementResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rapidApp.footDecodingMeasurement.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: FootDecodingMeasurementUpdateComponent,
    resolve: {
      footDecodingMeasurement: FootDecodingMeasurementResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rapidApp.footDecodingMeasurement.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
