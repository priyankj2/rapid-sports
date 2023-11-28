import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPatientCourseOfAction } from 'app/shared/model/patient-course-of-action.model';

@Component({
  selector: 'jhi-patient-course-of-action-detail',
  templateUrl: './patient-course-of-action-detail.component.html'
})
export class PatientCourseOfActionDetailComponent implements OnInit {
  patientCourseOfAction: IPatientCourseOfAction | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ patientCourseOfAction }) => (this.patientCourseOfAction = patientCourseOfAction));
  }

  previousState(): void {
    window.history.back();
  }
}
