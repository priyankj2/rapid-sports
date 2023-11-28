import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RapidSharedModule } from 'app/shared/shared.module';
import { ClinicComponent } from './clinic.component';
import { ClinicDetailComponent } from './clinic-detail.component';
import { ClinicUpdateComponent } from './clinic-update.component';
import { ClinicDeleteDialogComponent } from './clinic-delete-dialog.component';
import { clinicRoute } from './clinic.route';

@NgModule({
  imports: [RapidSharedModule, RouterModule.forChild(clinicRoute)],
  declarations: [ClinicComponent, ClinicDetailComponent, ClinicUpdateComponent, ClinicDeleteDialogComponent],
  entryComponents: [ClinicDeleteDialogComponent]
})
export class RapidClinicModule {}
