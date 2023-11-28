import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { AreaOfConcentration, IAreaOfConcentration } from 'app/shared/model/area-of-concentration.model';
import { AreaOfConcentrationService } from './area-of-concentration.service';
import { ITestResult } from 'app/shared/model/test-result.model';
import { TestResultService } from 'app/entities/test-result/test-result.service';
import { IAssessment } from 'app/shared/model/assessment.model';
import { AssessmentService } from 'app/entities/assessment/assessment.service';

type SelectableEntity = ITestResult | IAssessment;

@Component({
  selector: 'jhi-area-of-concentration-update',
  templateUrl: './area-of-concentration-update.component.html'
})
export class AreaOfConcentrationUpdateComponent implements OnInit {
  isSaving = false;
  testresults: ITestResult[] = [];
  assessments: IAssessment[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    orthopedic: [],
    description: [null, [Validators.maxLength(2000)]],
    testResult: [],
    assessment: []
  });

  constructor(
    protected areaOfConcentrationService: AreaOfConcentrationService,
    protected testResultService: TestResultService,
    protected assessmentService: AssessmentService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ areaOfConcentration }) => {
      this.updateForm(areaOfConcentration);

      this.testResultService.query().subscribe((res: HttpResponse<ITestResult[]>) => (this.testresults = res.body || []));

      this.assessmentService.query().subscribe((res: HttpResponse<IAssessment[]>) => (this.assessments = res.body || []));
    });
  }

  updateForm(areaOfConcentration: IAreaOfConcentration): void {
    this.editForm.patchValue({
      id: areaOfConcentration.id,
      name: areaOfConcentration.name,
      orthopedic: areaOfConcentration.orthopedic,
      description: areaOfConcentration.description,
      testResult: areaOfConcentration.testResult,
      assessment: areaOfConcentration.assessment
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const areaOfConcentration = this.createFromForm();
    if (areaOfConcentration.id !== undefined) {
      this.subscribeToSaveResponse(this.areaOfConcentrationService.update(areaOfConcentration));
    } else {
      this.subscribeToSaveResponse(this.areaOfConcentrationService.create(areaOfConcentration));
    }
  }

  private createFromForm(): IAreaOfConcentration {
    return {
      ...new AreaOfConcentration(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      orthopedic: this.editForm.get(['orthopedic'])!.value,
      description: this.editForm.get(['description'])!.value,
      testResult: this.editForm.get(['testResult'])!.value,
      assessment: this.editForm.get(['assessment'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAreaOfConcentration>>): void {
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
