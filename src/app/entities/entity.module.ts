import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'foot-type',
        loadChildren: () => import('./foot-type/foot-type.module').then(m => m.RapidFootTypeModule)
      },
      {
        path: 'observation',
        loadChildren: () => import('./observation/observation.module').then(m => m.RapidObservationModule)
      },
      {
        path: 'foot-decoding-measurement',
        loadChildren: () =>
          import('./foot-decoding-measurement/foot-decoding-measurement.module').then(m => m.RapidFootDecodingMeasurementModule)
      },
      {
        path: 'foot-decoding-measurement-raw',
        loadChildren: () =>
          import('./foot-decoding-measurement-raw/foot-decoding-measurement-raw.module').then(m => m.RapidFootDecodingMeasurementRawModule)
      },
      {
        path: 'exercise-or-modality',
        loadChildren: () => import('./exercise-or-modality/exercise-or-modality.module').then(m => m.RapidExerciseOrModalityModule)
      },
      {
        path: 'supporting-video',
        loadChildren: () => import('./supporting-video/supporting-video.module').then(m => m.RapidSupportingVideoModule)
      },
      {
        path: 'athlete',
        loadChildren: () => import('./patient/patient.module').then(m => m.RapidPatientModule)
      },
      {
        path: 'coach',
        loadChildren: () => import('./care-provider/care-provider.module').then(m => m.RapidCareProviderModule)
      },
      {
        path: 'condition',
        loadChildren: () => import('./condition/condition.module').then(m => m.RapidConditionModule)
      },
      {
        path: 'area-of-concentration',
        loadChildren: () => import('./area-of-concentration/area-of-concentration.module').then(m => m.RapidAreaOfConcentrationModule)
      },
      {
        path: 'test-result',
        loadChildren: () => import('./test-result/test-result.module').then(m => m.RapidTestResultModule)
      },
      {
        path: 'course-of-action-mapping',
        loadChildren: () =>
          import('./course-of-action-mapping/course-of-action-mapping.module').then(m => m.RapidCourseOfActionMappingModule)
      },
      {
        path: 'assessment',
        loadChildren: () => import('./assessment/assessment.module').then(m => m.RapidAssessmentModule)
      },
      {
        path: 'location',
        loadChildren: () => import('./location/location.module').then(m => m.RapidLocationModule)
      },
      {
        path: 'state-or-province',
        loadChildren: () => import('./state-or-province/state-or-province.module').then(m => m.RapidStateOrProvinceModule)
      },
      {
        path: 'country',
        loadChildren: () => import('./country/country.module').then(m => m.RapidCountryModule)
      },
      {
        path: 'clinic',
        loadChildren: () => import('./clinic/clinic.module').then(m => m.RapidClinicModule)
      },
      {
        path: 'appointment',
        loadChildren: () => import('./appointment/appointment.module').then(m => m.RapidAppointmentModule)
      },
      {
        path: 'balance-percentile',
        loadChildren: () => import('./balance-percentile/balance-percentile.module').then(m => m.RapidBalancePercentileModule)
      },
      {
        path: 'age-group',
        loadChildren: () => import('./age-group/age-group.module').then(m => m.RapidAgeGroupModule)
      },
      {
        path: 'fall-risk',
        loadChildren: () => import('./fall-risk/fall-risk.module').then(m => m.RapidFallRiskModule)
      },
      {
        path: 'fall-risk-range',
        loadChildren: () => import('./fall-risk-range/fall-risk-range.module').then(m => m.RapidFallRiskRangeModule)
      },
      {
        path: 'image-data',
        loadChildren: () => import('./image-data/image-data.module').then(m => m.RapidImageDataModule)
      },
      {
        path: 'athlete-course-of-action',
        loadChildren: () =>
          import('./patient-course-of-action/patient-course-of-action.module').then(m => m.RapidPatientCourseOfActionModule)
      },
      {
        path: 'exercise-assignment',
        loadChildren: () => import('./exercise-assignment/exercise-assignment.module').then(m => m.RapidExerciseAssignmentModule)
      },
      {
        path: 'athlete-note',
        loadChildren: () => import('./patient-note/patient-note.module').then(m => m.RapidPatientNoteModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class RapidEntityModule {}
