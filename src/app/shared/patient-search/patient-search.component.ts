import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { PatientService } from '../../entities/patient/patient.service';
import { IPatient, Patient } from '../model/patient.model';
import { AssessmentService } from '../../entities/assessment/assessment.service';
import { AppointmentModalService } from '../appointment-dialog/appointment-modal.service';
import { ObservationCategory } from '../model/enumerations/observation-enum.model';

@Component({
  selector: 'jhi-patient-search',
  templateUrl: './patient-search.component.html',
  styleUrls: ['./patient-search.component.scss']
})
export class PatientSearchComponent implements OnInit, OnDestroy {
  selectedPatient?: IPatient;
  idListItems?: Patient[];
  nameListItems?: Patient[];
  patientSource?: Patient[];
  private patientSubscription?: Subscription;
  hasExercisesAlready = false;
  private assessmentSubscription?: Subscription;
  hasFootDecoding = false;
  hasBalanceTests = false;
  remainingDays?: any = 0;

  constructor(
    private router: Router,
    private patientService: PatientService,
    private assessmentService: AssessmentService,
    private appointmentModal: AppointmentModalService
  ) {}

  ngOnInit(): void {
    this.patientSubscription = this.patientService.query({ size: 2000 }).subscribe(patientResponse => {
      const patients = patientResponse.body;

      if (patients) {
        this.patientSource = patients.map(patient => {
          this.remainingDays = patient?.clinic?.daysRemaining;
          return new Patient(
            patient.id,
            patient.firstName,
            patient.lastName,
            patient.gender,
            patient.email,
            patient.dateOfBirth,
            patient.medicalHistory,
            patient.patientID,
            patient.therapyWeeks,
            undefined,
            [],
            [],
            [],
            patient.primaryComplaint,
            patient.clinic
          );
        });
        this.nameListItems = this.patientSource.slice().sort(this.sortByName);
        this.idListItems = this.patientSource.slice().sort(this.sortByPatientID);
      }
    });
  }
  ngOnDestroy(): void {
    if (this.assessmentSubscription) {
      this.assessmentSubscription.unsubscribe();
    }
  }

  onBeginSession(): void {
    if (this.selectedPatient) {
      this.router.navigate(['athlete', this.selectedPatient.id, 'session']);
    }
  }

  onScheduleAppointment(): void {
    if (this.selectedPatient) {
      this.appointmentModal.open(this.selectedPatient);
    }
  }

  onViewExercises(): void {
    if (this.selectedPatient) {
      this.router.navigate(['athlete', this.selectedPatient.id, 'session', 'course-of-action']);
    }
  }

  onResults(): void {
    if (this.selectedPatient) {
      this.router.navigate(['/athlete', this.selectedPatient.id, 'session', 'results']);
    }
  }

  onViewFootDecodingHistory(): void {
    if (this.selectedPatient) {
      this.router.navigate(['athlete', this.selectedPatient.id, 'session', 'scanner-result']);
    }
  }

  onViewBalanceTestHistory(): void {
    if (this.selectedPatient) {
      this.router.navigate(['athlete', this.selectedPatient.id, 'session', 'balance-result']);
    }
  }

  onPatientValueChanged(selectedPatient: IPatient): void {
    this.hasExercisesAlready = false;
    this.hasFootDecoding = false;
    this.hasBalanceTests = false;
    if (selectedPatient) {
      this.assessmentSubscription = this.assessmentService.query({ patientId: this.selectedPatient!.id }).subscribe(value => {
        if (value.body && value.body.length > 0) {
          this.hasExercisesAlready = true;
          value.body.forEach(assessment => {
            const observation = assessment.observation;
            if (observation) {
              if (observation.category === ObservationCategory.PRESSURE_ANALYSIS) {
                this.hasFootDecoding = true;
              } else if (observation.internalCode === ObservationCategory.BALANCE) {
                this.hasBalanceTests = true;
              }
            }
          });
        }
      });
    }
  }

  handleNameFilter(value: string): void {
    this.nameListItems = this.patientSource
      ?.filter((s: Patient) => s.fullName?.toLowerCase().includes(value.toLowerCase()))
      .sort(this.sortByName);
  }

  handlePatientIdFilter(value: string): void {
    this.idListItems = this.patientSource
      ?.filter((s: Patient) => s.patientID?.toLowerCase().includes(value.toLowerCase()))
      .sort(this.sortByPatientID);
  }

  sortByName(a: Patient, b: Patient): number {
    return a.fullName!.localeCompare(b.fullName!);
  }

  sortByPatientID(a: Patient, b: Patient): number {
    if (!a.patientID) {
      if (!b.patientID) {
        return 0;
      }
      return 1;
    }
    return a.patientID.localeCompare(b.patientID!);
  }
}
