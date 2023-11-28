import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IAreaOfConcentration, AreaOfConcentration } from 'app/shared/model/area-of-concentration.model';
import { AreaOfConcentrationService } from './area-of-concentration.service';
import { AreaOfConcentrationComponent } from './area-of-concentration.component';
import { AreaOfConcentrationDetailComponent } from './area-of-concentration-detail.component';
import { AreaOfConcentrationUpdateComponent } from './area-of-concentration-update.component';

@Injectable({ providedIn: 'root' })
export class AreaOfConcentrationResolve implements Resolve<IAreaOfConcentration> {
  constructor(private service: AreaOfConcentrationService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAreaOfConcentration> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((areaOfConcentration: HttpResponse<AreaOfConcentration>) => {
          if (areaOfConcentration.body) {
            return of(areaOfConcentration.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new AreaOfConcentration());
  }
}

export const areaOfConcentrationRoute: Routes = [
  {
    path: '',
    component: AreaOfConcentrationComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rapidApp.areaOfConcentration.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: AreaOfConcentrationDetailComponent,
    resolve: {
      areaOfConcentration: AreaOfConcentrationResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rapidApp.areaOfConcentration.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: AreaOfConcentrationUpdateComponent,
    resolve: {
      areaOfConcentration: AreaOfConcentrationResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rapidApp.areaOfConcentration.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: AreaOfConcentrationUpdateComponent,
    resolve: {
      areaOfConcentration: AreaOfConcentrationResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rapidApp.areaOfConcentration.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
