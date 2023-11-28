import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ITestResult, TestResult } from 'app/shared/model/test-result.model';
import { TestResultService } from './test-result.service';
import { IFootType } from 'app/shared/model/foot-type.model';
import { FootTypeService } from 'app/entities/foot-type/foot-type.service';
import { ICondition } from 'app/shared/model/condition.model';
import { ConditionService } from 'app/entities/condition/condition.service';

type SelectableEntity = IFootType | ICondition;

@Component({
  selector: 'jhi-test-result-update',
  templateUrl: './test-result-update.component.html'
})
export class TestResultUpdateComponent implements OnInit {
  isSaving = false;
  foottypes: IFootType[] = [];
  conditions: ICondition[] = [];

  editForm = this.fb.group({
    id: [],
    title: [null, [Validators.required]],
    description: [null, [Validators.maxLength(2000)]],
    footType: [],
    condition: []
  });

  constructor(
    protected testResultService: TestResultService,
    protected footTypeService: FootTypeService,
    protected conditionService: ConditionService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ testResult }) => {
      this.updateForm(testResult);

      this.footTypeService.query().subscribe((res: HttpResponse<IFootType[]>) => (this.foottypes = res.body || []));

      this.conditionService.query().subscribe((res: HttpResponse<ICondition[]>) => (this.conditions = res.body || []));
    });
  }

  updateForm(testResult: ITestResult): void {
    this.editForm.patchValue({
      id: testResult.id,
      title: testResult.title,
      description: testResult.description,
      footType: testResult.footType,
      condition: testResult.condition
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const testResult = this.createFromForm();
    if (testResult.id !== undefined) {
      this.subscribeToSaveResponse(this.testResultService.update(testResult));
    } else {
      this.subscribeToSaveResponse(this.testResultService.create(testResult));
    }
  }

  private createFromForm(): ITestResult {
    return {
      ...new TestResult(),
      id: this.editForm.get(['id'])!.value,
      title: this.editForm.get(['title'])!.value,
      description: this.editForm.get(['description'])!.value,
      footType: this.editForm.get(['footType'])!.value,
      condition: this.editForm.get(['condition'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITestResult>>): void {
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
