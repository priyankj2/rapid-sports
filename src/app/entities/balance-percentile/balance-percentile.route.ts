import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IBalancePercentile, BalancePercentile } from 'app/shared/model/balance-percentile.model';
import { BalancePercentileService } from './balance-percentile.service';
import { BalancePercentileComponent } from './balance-percentile.component';
import { BalancePercentileDetailComponent } from './balance-percentile-detail.component';
import { BalancePercentileUpdateComponent } from './balance-percentile-update.component';

@Injectable({ providedIn: 'root' })
export class BalancePercentileResolve implements Resolve<IBalancePercentile> {
  constructor(private service: BalancePercentileService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IBalancePercentile> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((balancePercentile: HttpResponse<BalancePercentile>) => {
          if (balancePercentile.body) {
            return of(balancePercentile.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new BalancePercentile());
  }
}

export const balancePercentileRoute: Routes = [
  {
    path: '',
    component: BalancePercentileComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'rapidApp.balancePercentile.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: BalancePercentileDetailComponent,
    resolve: {
      balancePercentile: BalancePercentileResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rapidApp.balancePercentile.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: BalancePercentileUpdateComponent,
    resolve: {
      balancePercentile: BalancePercentileResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rapidApp.balancePercentile.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: BalancePercentileUpdateComponent,
    resolve: {
      balancePercentile: BalancePercentileResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rapidApp.balancePercentile.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
