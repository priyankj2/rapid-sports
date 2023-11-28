import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IFootType, FootType } from 'app/shared/model/foot-type.model';
import { FootTypeService } from './foot-type.service';
import { FootTypeComponent } from './foot-type.component';
import { FootTypeDetailComponent } from './foot-type-detail.component';
import { FootTypeUpdateComponent } from './foot-type-update.component';

@Injectable({ providedIn: 'root' })
export class FootTypeResolve implements Resolve<IFootType> {
  constructor(private service: FootTypeService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IFootType> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((footType: HttpResponse<FootType>) => {
          if (footType.body) {
            return of(footType.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new FootType());
  }
}

export const footTypeRoute: Routes = [
  {
    path: '',
    component: FootTypeComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rapidApp.footType.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: FootTypeDetailComponent,
    resolve: {
      footType: FootTypeResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rapidApp.footType.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: FootTypeUpdateComponent,
    resolve: {
      footType: FootTypeResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rapidApp.footType.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: FootTypeUpdateComponent,
    resolve: {
      footType: FootTypeResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rapidApp.footType.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
