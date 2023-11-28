import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IFallRiskRange, FallRiskRange } from 'app/shared/model/fall-risk-range.model';
import { FallRiskRangeService } from './fall-risk-range.service';
import { IAgeGroup } from 'app/shared/model/age-group.model';
import { AgeGroupService } from 'app/entities/age-group/age-group.service';

@Component({
  selector: 'jhi-fall-risk-range-update',
  templateUrl: './fall-risk-range-update.component.html'
})
export class FallRiskRangeUpdateComponent implements OnInit {
  isSaving = false;
  agegroups: IAgeGroup[] = [];

  editForm = this.fb.group({
    id: [],
    gender: [null, [Validators.required]],
    minimumValue: [null, [Validators.required]],
    maximumValue: [null, [Validators.required]],
    color: [null, [Validators.required]],
    ageGroup: []
  });

  constructor(
    protected fallRiskRangeService: FallRiskRangeService,
    protected ageGroupService: AgeGroupService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ fallRiskRange }) => {
      this.updateForm(fallRiskRange);

      this.ageGroupService.query().subscribe((res: HttpResponse<IAgeGroup[]>) => (this.agegroups = res.body || []));
    });
  }

  updateForm(fallRiskRange: IFallRiskRange): void {
    this.editForm.patchValue({
      id: fallRiskRange.id,
      gender: fallRiskRange.gender,
      minimumValue: fallRiskRange.minimumValue,
      maximumValue: fallRiskRange.maximumValue,
      color: fallRiskRange.color,
      ageGroup: fallRiskRange.ageGroup
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const fallRiskRange = this.createFromForm();
    if (fallRiskRange.id !== undefined) {
      this.subscribeToSaveResponse(this.fallRiskRangeService.update(fallRiskRange));
    } else {
      this.subscribeToSaveResponse(this.fallRiskRangeService.create(fallRiskRange));
    }
  }

  private createFromForm(): IFallRiskRange {
    return {
      ...new FallRiskRange(),
      id: this.editForm.get(['id'])!.value,
      gender: this.editForm.get(['gender'])!.value,
      minimumValue: this.editForm.get(['minimumValue'])!.value,
      maximumValue: this.editForm.get(['maximumValue'])!.value,
      color: this.editForm.get(['color'])!.value,
      ageGroup: this.editForm.get(['ageGroup'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFallRiskRange>>): void {
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
