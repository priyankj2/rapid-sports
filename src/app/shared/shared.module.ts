import { NgModule } from '@angular/core';
import { RapidSharedLibsModule } from './shared-libs.module';
import { FindLanguageFromKeyPipe } from './language/find-language-from-key.pipe';
import { AlertComponent } from './alert/alert.component';
import { AlertErrorComponent } from './alert/alert-error.component';
import { LoginModalComponent } from './login/login.component';
import { HasAnyAuthorityDirective } from './auth/has-any-authority.directive';
import { AppointmentDialogComponent } from './appointment-dialog/appointment-dialog.component';
import { DeviceInfoComponent } from './device-info/device-info.component';
import { ExcelPasteDirective } from './directives/excel-paste.directive';
import { EventLoggerComponent } from './event-logger/event-logger.component';
import { PatientNoteEditFormComponent } from './notes/edit-form/patient-note-edit-form.component';
import { PatientNoteListComponent } from './notes/patient-note-list.component';
import { PatientSearchComponent } from './patient-search/patient-search.component';
import { ScheduleComponent } from './schedule/schedule.component';


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
