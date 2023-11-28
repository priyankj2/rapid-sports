import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IFallRiskRange, FallRiskRange } from 'app/shared/model/fall-risk-range.model';
import { FallRiskRangeService } from './fall-risk-range.service';
import { FallRiskRangeComponent } from './fall-risk-range.component';
import { FallRiskRangeDetailComponent } from './fall-risk-range-detail.component';
import { FallRiskRangeUpdateComponent } from './fall-risk-range-update.component';

@Injectable({ providedIn: 'root' })
export class FallRiskRangeResolve implements Resolve<IFallRiskRange> {
  constructor(private service: FallRiskRangeService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IFallRiskRange> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((fallRiskRange: HttpResponse<FallRiskRange>) => {
          if (fallRiskRange.body) {
            return of(fallRiskRange.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new FallRiskRange());
  }
}

export const fallRiskRangeRoute: Routes = [
  {
    path: '',
    component: FallRiskRangeComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'rapidApp.fallRiskRange.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: FallRiskRangeDetailComponent,
    resolve: {
      fallRiskRange: FallRiskRangeResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rapidApp.fallRiskRange.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: FallRiskRangeUpdateComponent,
    resolve: {
      fallRiskRange: FallRiskRangeResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rapidApp.fallRiskRange.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: FallRiskRangeUpdateComponent,
    resolve: {
      fallRiskRange: FallRiskRangeResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rapidApp.fallRiskRange.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
