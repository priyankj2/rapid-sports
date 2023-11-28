import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICareProvider, CareProvider } from 'app/shared/model/care-provider.model';
import { CareProviderService } from './care-provider.service';
import { CareProviderComponent } from './care-provider.component';
import { CareProviderDetailComponent } from './care-provider-detail.component';
import { CareProviderUpdateComponent } from './care-provider-update.component';

@Injectable({ providedIn: 'root' })
export class CareProviderResolve implements Resolve<ICareProvider> {
  constructor(private service: CareProviderService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICareProvider> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((careProvider: HttpResponse<CareProvider>) => {
          if (careProvider.body) {
            return of(careProvider.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new CareProvider());
  }
}

export const careProviderRoute: Routes = [
  {
    path: '',
    component: CareProviderComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'rapidApp.careProvider.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: CareProviderDetailComponent,
    resolve: {
      careProvider: CareProviderResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rapidApp.careProvider.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: CareProviderUpdateComponent,
    resolve: {
      careProvider: CareProviderResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rapidApp.careProvider.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: CareProviderUpdateComponent,
    resolve: {
      careProvider: CareProviderResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rapidApp.careProvider.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
