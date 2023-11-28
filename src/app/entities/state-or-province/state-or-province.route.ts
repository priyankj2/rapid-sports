import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IStateOrProvince, StateOrProvince } from 'app/shared/model/state-or-province.model';
import { StateOrProvinceService } from './state-or-province.service';
import { StateOrProvinceComponent } from './state-or-province.component';
import { StateOrProvinceDetailComponent } from './state-or-province-detail.component';
import { StateOrProvinceUpdateComponent } from './state-or-province-update.component';

@Injectable({ providedIn: 'root' })
export class StateOrProvinceResolve implements Resolve<IStateOrProvince> {
  constructor(private service: StateOrProvinceService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IStateOrProvince> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((stateOrProvince: HttpResponse<StateOrProvince>) => {
          if (stateOrProvince.body) {
            return of(stateOrProvince.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new StateOrProvince());
  }
}

export const stateOrProvinceRoute: Routes = [
  {
    path: '',
    component: StateOrProvinceComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rapidApp.stateOrProvince.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: StateOrProvinceDetailComponent,
    resolve: {
      stateOrProvince: StateOrProvinceResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rapidApp.stateOrProvince.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: StateOrProvinceUpdateComponent,
    resolve: {
      stateOrProvince: StateOrProvinceResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rapidApp.stateOrProvince.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: StateOrProvinceUpdateComponent,
    resolve: {
      stateOrProvince: StateOrProvinceResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rapidApp.stateOrProvince.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
