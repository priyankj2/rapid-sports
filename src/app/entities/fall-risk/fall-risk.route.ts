import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IFallRisk, FallRisk } from 'app/shared/model/fall-risk.model';
import { FallRiskService } from './fall-risk.service';
import { FallRiskComponent } from './fall-risk.component';
import { FallRiskDetailComponent } from './fall-risk-detail.component';
import { FallRiskUpdateComponent } from './fall-risk-update.component';

@Injectable({ providedIn: 'root' })
export class FallRiskResolve implements Resolve<IFallRisk> {
  constructor(private service: FallRiskService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IFallRisk> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((fallRisk: HttpResponse<FallRisk>) => {
          if (fallRisk.body) {
            return of(fallRisk.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new FallRisk());
  }
}

export const fallRiskRoute: Routes = [
  {
    path: '',
    component: FallRiskComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'rapidApp.fallRisk.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: FallRiskDetailComponent,
    resolve: {
      fallRisk: FallRiskResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rapidApp.fallRisk.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: FallRiskUpdateComponent,
    resolve: {
      fallRisk: FallRiskResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rapidApp.fallRisk.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: FallRiskUpdateComponent,
    resolve: {
      fallRisk: FallRiskResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rapidApp.fallRisk.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
