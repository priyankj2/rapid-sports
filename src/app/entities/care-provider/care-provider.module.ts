import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CareProviderComponent } from './care-provider.component';
import { CareProviderDetailComponent } from './care-provider-detail.component';
import { CareProviderUpdateComponent } from './care-provider-update.component';
import { CareProviderDeleteDialogComponent } from './care-provider-delete-dialog.component';
import { careProviderRoute } from './care-provider.route';
import { RapidSharedModule } from '../../shared/shared.module';

@NgModule({
  imports: [RapidSharedModule, RouterModule.forChild(careProviderRoute)],
  declarations: [CareProviderComponent, CareProviderDetailComponent, CareProviderUpdateComponent, CareProviderDeleteDialogComponent],
  entryComponents: [CareProviderDeleteDialogComponent]
})
export class RapidCareProviderModule {}
