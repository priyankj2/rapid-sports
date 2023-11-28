import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, Router, Routes } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPatientNote, PatientNote } from 'app/shared/model/patient-note.model';
import { PatientNoteService } from './patient-note.service';
import { PatientNoteComponent } from './patient-note.component';
import { PatientNoteDetailComponent } from './patient-note-detail.component';
import { PatientNoteUpdateComponent } from './patient-note-update.component';

@Injectable({ providedIn: 'root' })
export class PatientNoteResolve implements Resolve<IPatientNote> {
  constructor(private service: PatientNoteService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPatientNote> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((patientNote: HttpResponse<PatientNote>) => {
          if (patientNote.body) {
            return of(patientNote.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new PatientNote());
  }
}

export const patientNoteRoute: Routes = [
  {
    path: '',
    component: PatientNoteComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rapidApp.patientNote.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PatientNoteDetailComponent,
    resolve: {
      patientNote: PatientNoteResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rapidApp.patientNote.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PatientNoteUpdateComponent,
    resolve: {
      patientNote: PatientNoteResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rapidApp.patientNote.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PatientNoteUpdateComponent,
    resolve: {
      patientNote: PatientNoteResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rapidApp.patientNote.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
