import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { CourseOfActionMapping, ICourseOfActionMapping } from 'app/shared/model/course-of-action-mapping.model';
import { CourseOfActionMappingService } from './course-of-action-mapping.service';
import { ICondition } from 'app/shared/model/condition.model';
import { ConditionService } from 'app/entities/condition/condition.service';
import { IFootType } from 'app/shared/model/foot-type.model';
import { FootTypeService } from 'app/entities/foot-type/foot-type.service';
import { IAreaOfConcentration } from 'app/shared/model/area-of-concentration.model';
import { AreaOfConcentrationService } from 'app/entities/area-of-concentration/area-of-concentration.service';
import { IClinic } from 'app/shared/model/clinic.model';
import { ClinicService } from 'app/entities/clinic/clinic.service';
import { IExerciseOrModality } from 'app/shared/model/exercise-or-modality.model';
import { ExerciseOrModalityService } from 'app/entities/exercise-or-modality/exercise-or-modality.service';
import { IObservation } from 'app/shared/model/observation.model';
import { ObservationService } from 'app/entities/observation/observation.service';

type SelectableEntity = ICondition | IFootType | IAreaOfConcentration | IClinic | IExerciseOrModality | IObservation;

@Component({
  selector: 'jhi-course-of-action-mapping-update',
  templateUrl: './course-of-action-mapping-update.component.html'
})
export class CourseOfActionMappingUpdateComponent implements OnInit {
  isSaving = false;
  conditions: ICondition[] = [];
  foottypes: IFootType[] = [];
  areaofconcentrations: IAreaOfConcentration[] = [];
  clinics: IClinic[] = [];
  exerciseormodalities: IExerciseOrModality[] = [];
  observations: IObservation[] = [];

  editForm = this.fb.group({
    id: [],
    label: [],
    condition: [],
    footType: [],
    areaOfConcentration: [],
    clinic: [],
    exercises: [],
    observation: []
  });

  constructor(
    protected courseOfActionMappingService: CourseOfActionMappingService,
    protected conditionService: ConditionService,
    protected footTypeService: FootTypeService,
    protected areaOfConcentrationService: AreaOfConcentrationService,
    protected clinicService: ClinicService,
    protected exerciseOrModalityService: ExerciseOrModalityService,
    protected observationService: ObservationService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ courseOfActionMapping }) => {
      this.updateForm(courseOfActionMapping);

      this.conditionService.query().subscribe((res: HttpResponse<ICondition[]>) => (this.conditions = res.body || []));

      this.footTypeService.query().subscribe((res: HttpResponse<IFootType[]>) => (this.foottypes = res.body || []));

      this.areaOfConcentrationService
        .query()
        .subscribe((res: HttpResponse<IAreaOfConcentration[]>) => (this.areaofconcentrations = res.body || []));

      this.clinicService.query().subscribe((res: HttpResponse<IClinic[]>) => (this.clinics = res.body || []));

      this.exerciseOrModalityService
        .query()
        .subscribe((res: HttpResponse<IExerciseOrModality[]>) => (this.exerciseormodalities = res.body || []));

      this.observationService.query().subscribe((res: HttpResponse<IObservation[]>) => (this.observations = res.body || []));
    });
  }

  updateForm(courseOfActionMapping: ICourseOfActionMapping): void {
    this.editForm.patchValue({
      id: courseOfActionMapping.id,
      label: courseOfActionMapping.label,
      condition: courseOfActionMapping.condition,
      footType: courseOfActionMapping.footType,
      areaOfConcentration: courseOfActionMapping.areaOfConcentration,
      clinic: courseOfActionMapping.clinic,
      exercises: courseOfActionMapping.exercises,
      observation: courseOfActionMapping.observation
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const courseOfActionMapping = this.createFromForm();
    if (courseOfActionMapping.id !== undefined) {
      this.subscribeToSaveResponse(this.courseOfActionMappingService.update(courseOfActionMapping));
    } else {
      this.subscribeToSaveResponse(this.courseOfActionMappingService.create(courseOfActionMapping));
    }
  }

  private createFromForm(): ICourseOfActionMapping {
    return {
      ...new CourseOfActionMapping(),
      id: this.editForm.get(['id'])!.value,
      label: this.editForm.get(['label'])!.value,
      condition: this.editForm.get(['condition'])!.value,
      footType: this.editForm.get(['footType'])!.value,
      areaOfConcentration: this.editForm.get(['areaOfConcentration'])!.value,
      clinic: this.editForm.get(['clinic'])!.value,
      exercises: this.editForm.get(['exercises'])!.value,
      observation: this.editForm.get(['observation'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICourseOfActionMapping>>): void {
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

  getSelected(selectedVals: IExerciseOrModality[], option: IExerciseOrModality): IExerciseOrModality {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
