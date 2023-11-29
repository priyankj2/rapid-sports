import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { AgeGroupService } from './age-group.service';
import { AgeGroupComponent } from './age-group.component';
import { AgeGroupDetailComponent } from './age-group-detail.component';
import { AgeGroupUpdateComponent } from './age-group-update.component';
import { IAgeGroup, AgeGroup } from '../../shared/model/age-group.model';
import { UserRouteAccessService } from '../../core/auth/user-route-access-service';
import { Authority } from '../../shared/constants/authority.constants';

@Injectable({ providedIn: 'root' })
export class AgeGroupResolve implements Resolve<IAgeGroup> {
  constructor(private service: AgeGroupService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAgeGroup> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((ageGroup: HttpResponse<AgeGroup>) => {
          if (ageGroup.body) {
            return of(ageGroup.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new AgeGroup());
  }
}

export const ageGroupRoute: Routes = [
  {
    path: '',
    component: AgeGroupComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rapidApp.ageGroup.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: AgeGroupDetailComponent,
    resolve: {
      ageGroup: AgeGroupResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rapidApp.ageGroup.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: AgeGroupUpdateComponent,
    resolve: {
      ageGroup: AgeGroupResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rapidApp.ageGroup.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: AgeGroupUpdateComponent,
    resolve: {
      ageGroup: AgeGroupResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rapidApp.ageGroup.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
