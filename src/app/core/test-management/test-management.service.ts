import { EventEmitter, Injectable } from '@angular/core';
import { IObservation } from 'app/shared/model/observation.model';
import { ICondition } from 'app/shared/model/condition.model';
import { FootTestResult } from 'app/shared/model/foot-test-result.model';
import { CenterOfPressure } from 'app/core/boditrak/center-of-pressure.model';
import { IAreaOfConcentration } from 'app/shared/model/area-of-concentration.model';
import { Assessment, IAssessment } from 'app/shared/model/assessment.model';
import { AssessmentService } from 'app/entities/assessment/assessment.service';
import * as moment from 'moment';
import { IPatient } from 'app/shared/model/patient.model';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { IAgeGroup } from 'app/shared/model/age-group.model';
import { NotificationService } from '@progress/kendo-angular-notification';
import { ImageData } from 'app/shared/model/image-data.model';
import { ObservationCategory } from 'app/shared/model/enumerations/observation-enum.model';

@Injectable({
  providedIn: 'root'
})
export class TestManagementService {
  public deviceAddress?: string;
  public selectedObservation?: IObservation;
  public selectedPatient?: IPatient;
  public selectedPatientAgeGroup?: IAgeGroup;
  selectedCondition?: ICondition;
  currentAssessment?: IAssessment;

  public addressChanged = new EventEmitter<string>();
  public calculatedFootTypes?: FootTestResult;
  public aggregateRecording?: number[];
  public recordedCentersOfPressure?: CenterOfPressure[];
  public balanceLengthsOfPaths = [0, 0, 0, 0];
  public areasOfConcentraction: IAreaOfConcentration[] = [];
  public currentPainLevel = 0;
  currentImage?: ImageData;

  public standardPercentile?: number;
  public proPercentile?: number;
  public visionPercentile?: number;
  public vestibularPercentile?: number;
  biofeedbackObservation?: IObservation;

  constructor(private assessmentService: AssessmentService, private notificationService: NotificationService) {
    const storedAddress = localStorage.getItem('boditrak.ip.address');
    if (storedAddress) {
      this.deviceAddress = storedAddress;
    }
  }

  setAddress(address?: string): void {
    this.deviceAddress = address;
    if (address) {
      localStorage.setItem('boditrak.ip.address', address);
      this.notificationService.show({
        content: 'You are now connected to the mat at ' + address,
        hideAfter: 900,
        position: { horizontal: 'center', vertical: 'top' },
        animation: { type: 'fade', duration: 400 },
        type: { style: 'success', icon: true }
      });
    } else {
      localStorage.removeItem('boditrak.ip.address');
    }
    this.addressChanged.emit(address);
  }

  saveAssessment(): Observable<HttpResponse<IAssessment>> | undefined {
    if (!this.currentAssessment) {
      this.currentAssessment = new Assessment();
    }

    this.currentAssessment.startTime = moment();
    this.currentAssessment.condition = this.selectedCondition;
    this.currentAssessment.patient = this.selectedPatient;
    this.currentAssessment.selfAdministered = false;
    this.currentAssessment.observation = this.selectedObservation;
    this.currentAssessment.painLevel = this.currentPainLevel;
    this.currentAssessment.imageData = this.currentImage;
    this.currentAssessment.standardPathLength = this.balanceLengthsOfPaths[0];
    if (this.selectedObservation?.category === ObservationCategory.PRESSURE_ANALYSIS) {
      this.currentAssessment.leftFootType = this.calculatedFootTypes?.leftFoot;
      this.currentAssessment.rightFootType = this.calculatedFootTypes?.rightFoot;
      this.currentAssessment.leftFrontPressure = this.calculatedFootTypes?.leftFrontPressure;
      this.currentAssessment.leftRearPressure = this.calculatedFootTypes?.leftRearPressure;
      this.currentAssessment.rightFrontPressure = this.calculatedFootTypes?.rightFrontPressure;
      this.currentAssessment.rightRearPressure = this.calculatedFootTypes?.rightRearPressure;
      const centerOfPressure = this.recordedCentersOfPressure![0];
      if (!centerOfPressure) {
        return undefined;
      }
      this.currentAssessment.centerOfPressureX = centerOfPressure.x;
      this.currentAssessment.centerOfPressureY = centerOfPressure.y;
    } else if (this.selectedObservation?.category === ObservationCategory.BALANCE) {
      this.currentAssessment.proPathLength = this.balanceLengthsOfPaths[1];
      this.currentAssessment.visionPathLength = this.balanceLengthsOfPaths[2];
      this.currentAssessment.vestibularPathLength = this.balanceLengthsOfPaths[3];
    }

    if (this.currentAssessment.id) {
      return this.assessmentService.update(this.currentAssessment);
    } else {
      return this.assessmentService.create(this.currentAssessment);
    }
  }

  resetPatientValues(): void {
    this.balanceLengthsOfPaths = [0, 0, 0, 0];
    this.calculatedFootTypes = undefined;
    this.recordedCentersOfPressure = undefined;
    this.currentAssessment = undefined;
    this.aggregateRecording = undefined;
    this.currentPainLevel = 3;
    this.currentImage = undefined;

    this.standardPercentile = undefined;
    this.proPercentile = undefined;
    this.visionPercentile = undefined;
    this.vestibularPercentile = undefined;
  }
}
