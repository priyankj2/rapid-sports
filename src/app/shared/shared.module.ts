import { NgModule } from '@angular/core';
import { RapidSharedLibsModule } from './shared-libs.module';
import { FindLanguageFromKeyPipe } from './language/find-language-from-key.pipe';
import { AlertComponent } from './alert/alert.component';
import { AlertErrorComponent } from './alert/alert-error.component';
import { LoginModalComponent } from './login/login.component';
import { HasAnyAuthorityDirective } from './auth/has-any-authority.directive';
import { ScheduleComponent } from 'app/shared/schedule/schedule.component';
import { DeviceInfoComponent } from 'app/shared/device-info/device-info.component';
import { PatientSearchComponent } from 'app/shared/patient-search/patient-search.component';
import { AppointmentDialogComponent } from 'app/shared/appointment-dialog/appointment-dialog.component';
import { EventLoggerComponent } from './event-logger/event-logger.component';
import { ExcelPasteDirective } from 'app/shared/directives/excel-paste.directive';
import { PatientNoteListComponent } from 'app/shared/notes/patient-note-list.component';
import { PatientNoteEditFormComponent } from 'app/shared/notes/edit-form/patient-note-edit-form.component';

@NgModule({
  imports: [RapidSharedLibsModule],
  declarations: [
    FindLanguageFromKeyPipe,
    AlertComponent,
    AlertErrorComponent,
    LoginModalComponent,
    HasAnyAuthorityDirective,
    ScheduleComponent,
    DeviceInfoComponent,
    PatientSearchComponent,
    AppointmentDialogComponent,
    EventLoggerComponent,
    ExcelPasteDirective,
    PatientNoteListComponent,
    PatientNoteEditFormComponent
  ],
  entryComponents: [LoginModalComponent, AppointmentDialogComponent],
  exports: [
    RapidSharedLibsModule,
    FindLanguageFromKeyPipe,
    AlertComponent,
    AlertErrorComponent,
    LoginModalComponent,
    ScheduleComponent,
    DeviceInfoComponent,
    HasAnyAuthorityDirective,
    PatientSearchComponent,
    EventLoggerComponent,
    ExcelPasteDirective,
    PatientNoteListComponent,
    PatientNoteEditFormComponent
  ]
})
export class RapidSharedModule {}
