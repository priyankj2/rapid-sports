import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, Router, Routes } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { flatMap } from 'rxjs/operators';


import { PatientCourseOfActionService } from './patient-course-of-action.service';
import { PatientCourseOfActionComponent } from './patient-course-of-action.component';
import { PatientCourseOfActionDetailComponent } from './patient-course-of-action-detail.component';
import { PatientCourseOfActionUpdateComponent } from './patient-course-of-action-update.component';
import { UserRouteAccessService } from '../../core/auth/user-route-access-service';
import { Authority } from '../../shared/constants/authority.constants';
import { IPatientCourseOfAction, PatientCourseOfAction } from '../../shared/model/patient-course-of-action.model';

@Injectable({ providedIn: 'root' })
export class PatientCourseOfActionResolve implements Resolve<IPatientCourseOfAction> {
  constructor(private service: PatientCourseOfActionService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPatientCourseOfAction> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((patientCourseOfAction: HttpResponse<PatientCourseOfAction>) => {
          if (patientCourseOfAction.body) {
            return of(patientCourseOfAction.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new PatientCourseOfAction());
  }
}

export const patientCourseOfActionRoute: Routes = [
  {
    path: '',
    component: PatientCourseOfActionComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rapidApp.patientCourseOfAction.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PatientCourseOfActionDetailComponent,
    resolve: {
      patientCourseOfAction: PatientCourseOfActionResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rapidApp.patientCourseOfAction.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PatientCourseOfActionUpdateComponent,
    resolve: {
      patientCourseOfAction: PatientCourseOfActionResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rapidApp.patientCourseOfAction.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PatientCourseOfActionUpdateComponent,
    resolve: {
      patientCourseOfAction: PatientCourseOfActionResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rapidApp.patientCourseOfAction.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
