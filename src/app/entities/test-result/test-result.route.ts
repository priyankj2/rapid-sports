import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';


import { TestResultService } from './test-result.service';
import { TestResultComponent } from './test-result.component';
import { TestResultDetailComponent } from './test-result-detail.component';
import { TestResultUpdateComponent } from './test-result-update.component';
import { UserRouteAccessService } from '../../core/auth/user-route-access-service';
import { Authority } from '../../shared/constants/authority.constants';
import { ITestResult, TestResult } from '../../shared/model/test-result.model';

@Injectable({ providedIn: 'root' })
export class TestResultResolve implements Resolve<ITestResult> {
  constructor(private service: TestResultService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITestResult> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((testResult: HttpResponse<TestResult>) => {
          if (testResult.body) {
            return of(testResult.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new TestResult());
  }
}

export const testResultRoute: Routes = [
  {
    path: '',
    component: TestResultComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rapidApp.testResult.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TestResultDetailComponent,
    resolve: {
      testResult: TestResultResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rapidApp.testResult.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TestResultUpdateComponent,
    resolve: {
      testResult: TestResultResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rapidApp.testResult.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TestResultUpdateComponent,
    resolve: {
      testResult: TestResultResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rapidApp.testResult.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
