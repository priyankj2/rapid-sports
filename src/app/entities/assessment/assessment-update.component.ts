import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from '../../shared/constants/input.constants';
import { IAppointment } from '../../shared/model/appointment.model';
import { IAssessment, Assessment } from '../../shared/model/assessment.model';
import { ICareProvider } from '../../shared/model/care-provider.model';
import { ICondition } from '../../shared/model/condition.model';
import { IFootDecodingMeasurement } from '../../shared/model/foot-decoding-measurement.model';
import { IFootType } from '../../shared/model/foot-type.model';
import { IImageData } from '../../shared/model/image-data.model';
import { IObservation } from '../../shared/model/observation.model';
import { IPatient } from '../../shared/model/patient.model';
import { AppointmentService } from '../appointment/appointment.service';
import { CareProviderService } from '../care-provider/care-provider.service';
import { ConditionService } from '../condition/condition.service';
import { FootDecodingMeasurementService } from '../foot-decoding-measurement/foot-decoding-measurement.service';
import { FootTypeService } from '../foot-type/foot-type.service';
import { ImageDataService } from '../image-data/image-data.service';
import { ObservationService } from '../observation/observation.service';
import { PatientService } from '../patient/patient.service';
import { AssessmentService } from './assessment.service';


type SelectableEntity =
  | IImageData
  | ICareProvider
  | IObservation
  | IFootDecodingMeasurement
  | IFootType
  | ICondition
  | IAppointment
  | IPatient;

@Component({
  selector: 'jhi-assessment-update',
  templateUrl: './assessment-update.component.html'
})
export class AssessmentUpdateComponent implements OnInit {
  isSaving = false;
  imagedata: IImageData[] = [];
  careproviders: ICareProvider[] = [];
  observations: IObservation[] = [];
  footdecodingmeasurements: IFootDecodingMeasurement[] = [];
  foottypes: IFootType[] = [];
  conditions: ICondition[] = [];
  appointments: IAppointment[] = [];
  patients: IPatient[] = [];

  editForm = this.fb.group({
    id: [],
    startTime: [],
    selfAdministered: [],
    score: [],
    standardPathLength: [],
    proPathLength: [],
    visionPathLength: [],
    vestibularPathLength: [],
    standardPercentile: [],
    proPercentile: [],
    visionPercentile: [],
    vestibularPercentile: [],
    leftFrontPressure: [],
    leftRearPressure: [],
    rightFrontPressure: [],
    rightRearPressure: [],
    centerOfPressureX: [],
    centerOfPressureY: [],
    painLevel: [],
    notes: [null, [Validators.maxLength(2000)]],
    imageData: [],
    careProvider: [],
    observation: [],
    measurement: [],
    footType: [],
    leftFootType: [],
    rightFootType: [],
    condition: [],
    appointment: [],
    patient: []
  });

  constructor(
    protected assessmentService: AssessmentService,
    protected imageDataService: ImageDataService,
    protected careProviderService: CareProviderService,
    protected observationService: ObservationService,
    protected footDecodingMeasurementService: FootDecodingMeasurementService,
    protected footTypeService: FootTypeService,
    protected conditionService: ConditionService,
    protected appointmentService: AppointmentService,
    protected patientService: PatientService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ assessment }) => {
      if (!assessment.id) {
        const today = moment().startOf('day');
        assessment.startTime = today;
      }

      this.updateForm(assessment);

      this.imageDataService
        .query({ filter: 'book-is-null' })
        .pipe(
          map((res: HttpResponse<IImageData[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IImageData[]) => {
          if (!assessment.imageData || !assessment.imageData.id) {
            this.imagedata = resBody;
          } else {
            this.imageDataService
              .find(assessment.imageData.id)
              .pipe(
                map((subRes: HttpResponse<IImageData>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IImageData[]) => (this.imagedata = concatRes));
          }
        });

      this.careProviderService.query().subscribe((res: HttpResponse<ICareProvider[]>) => (this.careproviders = res.body || []));

      this.observationService.query().subscribe((res: HttpResponse<IObservation[]>) => (this.observations = res.body || []));

      this.footDecodingMeasurementService
        .query()
        .subscribe((res: HttpResponse<IFootDecodingMeasurement[]>) => (this.footdecodingmeasurements = res.body || []));

      this.footTypeService.query().subscribe((res: HttpResponse<IFootType[]>) => (this.foottypes = res.body || []));

      this.conditionService.query().subscribe((res: HttpResponse<ICondition[]>) => (this.conditions = res.body || []));

      this.appointmentService.query().subscribe((res: HttpResponse<IAppointment[]>) => (this.appointments = res.body || []));

      this.patientService.query().subscribe((res: HttpResponse<IPatient[]>) => (this.patients = res.body || []));
    });
  }

  updateForm(assessment: IAssessment): void {
    this.editForm.patchValue({
      id: assessment.id,
      startTime: assessment.startTime ? assessment.startTime.format(DATE_TIME_FORMAT) : null,
      selfAdministered: assessment.selfAdministered,
      score: assessment.score,
      standardPathLength: assessment.standardPathLength,
      proPathLength: assessment.proPathLength,
      visionPathLength: assessment.visionPathLength,
      vestibularPathLength: assessment.vestibularPathLength,
      standardPercentile: assessment.standardPercentile,
      proPercentile: assessment.proPercentile,
      visionPercentile: assessment.visionPercentile,
      vestibularPercentile: assessment.vestibularPercentile,
      leftFrontPressure: assessment.leftFrontPressure,
      leftRearPressure: assessment.leftRearPressure,
      rightFrontPressure: assessment.rightFrontPressure,
      rightRearPressure: assessment.rightRearPressure,
      centerOfPressureX: assessment.centerOfPressureX,
      centerOfPressureY: assessment.centerOfPressureY,
      painLevel: assessment.painLevel,
      notes: assessment.notes,
      imageData: assessment.imageData,
      careProvider: assessment.careProvider,
      observation: assessment.observation,
      measurement: assessment.measurement,
      footType: assessment.footType,
      leftFootType: assessment.leftFootType,
      rightFootType: assessment.rightFootType,
      condition: assessment.condition,
      appointment: assessment.appointment,
      patient: assessment.patient
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const assessment = this.createFromForm();
    if (assessment.id !== undefined) {
      this.subscribeToSaveResponse(this.assessmentService.update(assessment));
    } else {
      this.subscribeToSaveResponse(this.assessmentService.create(assessment));
    }
  }

  private createFromForm(): IAssessment {
    return {
      ...new Assessment(),
      id: this.editForm.get(['id'])!.value,
      startTime: this.editForm.get(['startTime'])!.value ? moment(this.editForm.get(['startTime'])!.value, DATE_TIME_FORMAT) : undefined,
      selfAdministered: this.editForm.get(['selfAdministered'])!.value,
      score: this.editForm.get(['score'])!.value,
      standardPathLength: this.editForm.get(['standardPathLength'])!.value,
      proPathLength: this.editForm.get(['proPathLength'])!.value,
      visionPathLength: this.editForm.get(['visionPathLength'])!.value,
      vestibularPathLength: this.editForm.get(['vestibularPathLength'])!.value,
      standardPercentile: this.editForm.get(['standardPercentile'])!.value,
      proPercentile: this.editForm.get(['proPercentile'])!.value,
      visionPercentile: this.editForm.get(['visionPercentile'])!.value,
      vestibularPercentile: this.editForm.get(['vestibularPercentile'])!.value,
      leftFrontPressure: this.editForm.get(['leftFrontPressure'])!.value,
      leftRearPressure: this.editForm.get(['leftRearPressure'])!.value,
      rightFrontPressure: this.editForm.get(['rightFrontPressure'])!.value,
      rightRearPressure: this.editForm.get(['rightRearPressure'])!.value,
      centerOfPressureX: this.editForm.get(['centerOfPressureX'])!.value,
      centerOfPressureY: this.editForm.get(['centerOfPressureY'])!.value,
      painLevel: this.editForm.get(['painLevel'])!.value,
      notes: this.editForm.get(['notes'])!.value,
      imageData: this.editForm.get(['imageData'])!.value,
      careProvider: this.editForm.get(['careProvider'])!.value,
      observation: this.editForm.get(['observation'])!.value,
      measurement: this.editForm.get(['measurement'])!.value,
      footType: this.editForm.get(['footType'])!.value,
      leftFootType: this.editForm.get(['leftFootType'])!.value,
      rightFootType: this.editForm.get(['rightFootType'])!.value,
      condition: this.editForm.get(['condition'])!.value,
      appointment: this.editForm.get(['appointment'])!.value,
      patient: this.editForm.get(['patient'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAssessment>>): void {
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
