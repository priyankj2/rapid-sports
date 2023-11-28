import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IPatientCourseOfAction, PatientCourseOfAction } from 'app/shared/model/patient-course-of-action.model';
import { PatientCourseOfActionService } from './patient-course-of-action.service';
import { IPatient } from 'app/shared/model/patient.model';
import { PatientService } from 'app/entities/patient/patient.service';
import { IAssessment } from 'app/shared/model/assessment.model';
import { AssessmentService } from 'app/entities/assessment/assessment.service';

type SelectableEntity = IPatient | IAssessment;

@Component({
  selector: 'jhi-patient-course-of-action-update',
  templateUrl: './patient-course-of-action-update.component.html'
})
export class PatientCourseOfActionUpdateComponent implements OnInit {
  isSaving = false;
  patients: IPatient[] = [];
  assessments: IAssessment[] = [];

  editForm = this.fb.group({
    id: [],
    assignmentDate: [],
    patient: [],
    assessment: []
  });

  constructor(
    protected patientCourseOfActionService: PatientCourseOfActionService,
    protected patientService: PatientService,
    protected assessmentService: AssessmentService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ patientCourseOfAction }) => {
      if (!patientCourseOfAction.id) {
        const today = moment().startOf('day');
        patientCourseOfAction.assignmentDate = today;
      }

      this.updateForm(patientCourseOfAction);

      this.patientService.query().subscribe((res: HttpResponse<IPatient[]>) => (this.patients = res.body || []));

      this.assessmentService.query().subscribe((res: HttpResponse<IAssessment[]>) => (this.assessments = res.body || []));
    });
  }

  updateForm(patientCourseOfAction: IPatientCourseOfAction): void {
    this.editForm.patchValue({
      id: patientCourseOfAction.id,
      assignmentDate: patientCourseOfAction.assignmentDate ? patientCourseOfAction.assignmentDate.format(DATE_TIME_FORMAT) : null,
      patient: patientCourseOfAction.patient,
      assessment: patientCourseOfAction.assessment
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const patientCourseOfAction = this.createFromForm();
    if (patientCourseOfAction.id !== undefined) {
      this.subscribeToSaveResponse(this.patientCourseOfActionService.update(patientCourseOfAction));
    } else {
      this.subscribeToSaveResponse(this.patientCourseOfActionService.create(patientCourseOfAction));
    }
  }

  private createFromForm(): IPatientCourseOfAction {
    return {
      ...new PatientCourseOfAction(),
      id: this.editForm.get(['id'])!.value,
      assignmentDate: this.editForm.get(['assignmentDate'])!.value
        ? moment(this.editForm.get(['assignmentDate'])!.value, DATE_TIME_FORMAT)
        : undefined,
      patient: this.editForm.get(['patient'])!.value,
      assessment: this.editForm.get(['assessment'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPatientCourseOfAction>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
