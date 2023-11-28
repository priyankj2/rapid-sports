import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IClinic, Clinic } from 'app/shared/model/clinic.model';
import { ClinicService } from './clinic.service';
import { ClinicComponent } from './clinic.component';
import { ClinicDetailComponent } from './clinic-detail.component';
import { ClinicUpdateComponent } from './clinic-update.component';

@Injectable({ providedIn: 'root' })
export class ClinicResolve implements Resolve<IClinic> {
  constructor(private service: ClinicService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IClinic> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((clinic: HttpResponse<Clinic>) => {
          if (clinic.body) {
            return of(clinic.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Clinic());
  }
}

export const clinicRoute: Routes = [
  {
    path: '',
    component: ClinicComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rapidApp.clinic.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ClinicDetailComponent,
    resolve: {
      clinic: ClinicResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rapidApp.clinic.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ClinicUpdateComponent,
    resolve: {
      clinic: ClinicResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rapidApp.clinic.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ClinicUpdateComponent,
    resolve: {
      clinic: ClinicResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rapidApp.clinic.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
