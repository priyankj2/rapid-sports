import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, Router, Routes } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ExerciseAssignment, IExerciseAssignment } from 'app/shared/model/exercise-assignment.model';
import { ExerciseAssignmentService } from './exercise-assignment.service';
import { ExerciseAssignmentComponent } from './exercise-assignment.component';
import { ExerciseAssignmentDetailComponent } from './exercise-assignment-detail.component';
import { ExerciseAssignmentUpdateComponent } from './exercise-assignment-update.component';

@Injectable({ providedIn: 'root' })
export class ExerciseAssignmentResolve implements Resolve<IExerciseAssignment> {
  constructor(private service: ExerciseAssignmentService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IExerciseAssignment> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((exerciseAssignment: HttpResponse<ExerciseAssignment>) => {
          if (exerciseAssignment.body) {
            return of(exerciseAssignment.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ExerciseAssignment());
  }
}

export const exerciseAssignmentRoute: Routes = [
  {
    path: '',
    component: ExerciseAssignmentComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rapidApp.exerciseAssignment.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ExerciseAssignmentDetailComponent,
    resolve: {
      exerciseAssignment: ExerciseAssignmentResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rapidApp.exerciseAssignment.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ExerciseAssignmentUpdateComponent,
    resolve: {
      exerciseAssignment: ExerciseAssignmentResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rapidApp.exerciseAssignment.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ExerciseAssignmentUpdateComponent,
    resolve: {
      exerciseAssignment: ExerciseAssignmentResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rapidApp.exerciseAssignment.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
