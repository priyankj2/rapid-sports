import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICondition, Condition } from 'app/shared/model/condition.model';
import { ConditionService } from './condition.service';
import { ConditionComponent } from './condition.component';
import { ConditionDetailComponent } from './condition-detail.component';
import { ConditionUpdateComponent } from './condition-update.component';

@Injectable({ providedIn: 'root' })
export class ConditionResolve implements Resolve<ICondition> {
  constructor(private service: ConditionService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICondition> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((condition: HttpResponse<Condition>) => {
          if (condition.body) {
            return of(condition.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Condition());
  }
}

export const conditionRoute: Routes = [
  {
    path: '',
    component: ConditionComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rapidApp.condition.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ConditionDetailComponent,
    resolve: {
      condition: ConditionResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rapidApp.condition.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ConditionUpdateComponent,
    resolve: {
      condition: ConditionResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rapidApp.condition.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ConditionUpdateComponent,
    resolve: {
      condition: ConditionResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rapidApp.condition.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
