import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { AssessmentService } from './assessment.service';
import { AssessmentComponent } from './assessment.component';
import { AssessmentDetailComponent } from './assessment-detail.component';
import { AssessmentUpdateComponent } from './assessment-update.component';
import { UserRouteAccessService } from '../../core/auth/user-route-access-service';
import { Authority } from '../../shared/constants/authority.constants';
import { IAssessment, Assessment } from '../../shared/model/assessment.model';

@Injectable({ providedIn: 'root' })
export class AssessmentResolve implements Resolve<IAssessment> {
  constructor(private service: AssessmentService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAssessment> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((assessment: HttpResponse<Assessment>) => {
          if (assessment.body) {
            return of(assessment.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Assessment());
  }
}

export const assessmentRoute: Routes = [
  {
    path: '',
    component: AssessmentComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rapidApp.assessment.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: AssessmentDetailComponent,
    resolve: {
      assessment: AssessmentResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rapidApp.assessment.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: AssessmentUpdateComponent,
    resolve: {
      assessment: AssessmentResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rapidApp.assessment.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: AssessmentUpdateComponent,
    resolve: {
      assessment: AssessmentResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rapidApp.assessment.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
