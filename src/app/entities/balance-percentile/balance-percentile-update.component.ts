import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { BalancePercentile, IBalancePercentile } from 'app/shared/model/balance-percentile.model';
import { BalancePercentileService } from './balance-percentile.service';
import { IAgeGroup } from 'app/shared/model/age-group.model';
import { AgeGroupService } from 'app/entities/age-group/age-group.service';

@Component({
  selector: 'jhi-balance-percentile-update',
  templateUrl: './balance-percentile-update.component.html'
})
export class BalancePercentileUpdateComponent implements OnInit {
  isSaving = false;
  agegroups: IAgeGroup[] = [];

  editForm = this.fb.group({
    id: [],
    gender: [null, [Validators.required]],
    testCode: [null, [Validators.required]],
    minimumLength: [],
    percentileRank: [],
    ageGroup: []
  });

  constructor(
    protected balancePercentileService: BalancePercentileService,
    protected ageGroupService: AgeGroupService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ balancePercentile }) => {
      this.updateForm(balancePercentile);

      this.ageGroupService.query().subscribe((res: HttpResponse<IAgeGroup[]>) => (this.agegroups = res.body || []));
    });
  }

  updateForm(balancePercentile: IBalancePercentile): void {
    this.editForm.patchValue({
      id: balancePercentile.id,
      gender: balancePercentile.gender,
      testCode: balancePercentile.testCode,
      minimumLength: balancePercentile.minimumLength,
      percentileRank: balancePercentile.percentileRank,
      ageGroup: balancePercentile.ageGroup
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const balancePercentile = this.createFromForm();
    if (balancePercentile.id !== undefined) {
      this.subscribeToSaveResponse(this.balancePercentileService.update(balancePercentile));
    } else {
      this.subscribeToSaveResponse(this.balancePercentileService.create(balancePercentile));
    }
  }

  private createFromForm(): IBalancePercentile {
    return {
      ...new BalancePercentile(),
      id: this.editForm.get(['id'])!.value,
      gender: this.editForm.get(['gender'])!.value,
      testCode: this.editForm.get(['testCode'])!.value,
      minimumLength: this.editForm.get(['minimumLength'])!.value,
      percentileRank: this.editForm.get(['percentileRank'])!.value,
      ageGroup: this.editForm.get(['ageGroup'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBalancePercentile>>): void {
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

  trackById(index: number, item: IAgeGroup): any {
    return item.id;
  }
}
