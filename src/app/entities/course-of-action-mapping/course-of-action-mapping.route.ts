import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICourseOfActionMapping, CourseOfActionMapping } from 'app/shared/model/course-of-action-mapping.model';
import { CourseOfActionMappingService } from './course-of-action-mapping.service';
import { CourseOfActionMappingComponent } from './course-of-action-mapping.component';
import { CourseOfActionMappingDetailComponent } from './course-of-action-mapping-detail.component';
import { CourseOfActionMappingUpdateComponent } from './course-of-action-mapping-update.component';

@Injectable({ providedIn: 'root' })
export class CourseOfActionMappingResolve implements Resolve<ICourseOfActionMapping> {
  constructor(private service: CourseOfActionMappingService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICourseOfActionMapping> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((courseOfActionMapping: HttpResponse<CourseOfActionMapping>) => {
          if (courseOfActionMapping.body) {
            return of(courseOfActionMapping.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new CourseOfActionMapping());
  }
}

export const courseOfActionMappingRoute: Routes = [
  {
    path: '',
    component: CourseOfActionMappingComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'rapidApp.courseOfActionMapping.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: CourseOfActionMappingDetailComponent,
    resolve: {
      courseOfActionMapping: CourseOfActionMappingResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rapidApp.courseOfActionMapping.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: CourseOfActionMappingUpdateComponent,
    resolve: {
      courseOfActionMapping: CourseOfActionMappingResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rapidApp.courseOfActionMapping.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: CourseOfActionMappingUpdateComponent,
    resolve: {
      courseOfActionMapping: CourseOfActionMappingResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rapidApp.courseOfActionMapping.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
