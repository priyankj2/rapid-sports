import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IFallRisk, FallRisk } from 'app/shared/model/fall-risk.model';
import { FallRiskService } from './fall-risk.service';
import { IAgeGroup } from 'app/shared/model/age-group.model';
import { AgeGroupService } from 'app/entities/age-group/age-group.service';

@Component({
  selector: 'jhi-fall-risk-update',
  templateUrl: './fall-risk-update.component.html'
})
export class FallRiskUpdateComponent implements OnInit {
  isSaving = false;
  agegroups: IAgeGroup[] = [];

  editForm = this.fb.group({
    id: [],
    gender: [null, [Validators.required]],
    minimumLength: [null, [Validators.required]],
    percentileRank: [null, [Validators.required]],
    ageGroup: []
  });

  constructor(
    protected fallRiskService: FallRiskService,
    protected ageGroupService: AgeGroupService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ fallRisk }) => {
      this.updateForm(fallRisk);

      this.ageGroupService.query().subscribe((res: HttpResponse<IAgeGroup[]>) => (this.agegroups = res.body || []));
    });
  }

  updateForm(fallRisk: IFallRisk): void {
    this.editForm.patchValue({
      id: fallRisk.id,
      gender: fallRisk.gender,
      minimumLength: fallRisk.minimumLength,
      percentileRank: fallRisk.percentileRank,
      ageGroup: fallRisk.ageGroup
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const fallRisk = this.createFromForm();
    if (fallRisk.id !== undefined) {
      this.subscribeToSaveResponse(this.fallRiskService.update(fallRisk));
    } else {
      this.subscribeToSaveResponse(this.fallRiskService.create(fallRisk));
    }
  }

  private createFromForm(): IFallRisk {
    return {
      ...new FallRisk(),
      id: this.editForm.get(['id'])!.value,
      gender: this.editForm.get(['gender'])!.value,
      minimumLength: this.editForm.get(['minimumLength'])!.value,
      percentileRank: this.editForm.get(['percentileRank'])!.value,
      ageGroup: this.editForm.get(['ageGroup'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFallRisk>>): void {
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
