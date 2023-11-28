import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IExerciseOrModality, ExerciseOrModality } from 'app/shared/model/exercise-or-modality.model';
import { ExerciseOrModalityService } from './exercise-or-modality.service';
import { ExerciseOrModalityComponent } from './exercise-or-modality.component';
import { ExerciseOrModalityDetailComponent } from './exercise-or-modality-detail.component';
import { ExerciseOrModalityUpdateComponent } from './exercise-or-modality-update.component';

@Injectable({ providedIn: 'root' })
export class ExerciseOrModalityResolve implements Resolve<IExerciseOrModality> {
  constructor(private service: ExerciseOrModalityService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IExerciseOrModality> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((exerciseOrModality: HttpResponse<ExerciseOrModality>) => {
          if (exerciseOrModality.body) {
            return of(exerciseOrModality.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ExerciseOrModality());
  }
}

export const exerciseOrModalityRoute: Routes = [
  {
    path: '',
    component: ExerciseOrModalityComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rapidApp.exerciseOrModality.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ExerciseOrModalityDetailComponent,
    resolve: {
      exerciseOrModality: ExerciseOrModalityResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rapidApp.exerciseOrModality.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ExerciseOrModalityUpdateComponent,
    resolve: {
      exerciseOrModality: ExerciseOrModalityResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rapidApp.exerciseOrModality.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ExerciseOrModalityUpdateComponent,
    resolve: {
      exerciseOrModality: ExerciseOrModalityResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rapidApp.exerciseOrModality.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
