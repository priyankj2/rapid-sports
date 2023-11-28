import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { CareProvider, ICareProvider } from 'app/shared/model/care-provider.model';
import { CareProviderService } from './care-provider.service';
import { IClinic } from 'app/shared/model/clinic.model';
import { ClinicService } from 'app/entities/clinic/clinic.service';

type SelectableEntity = IClinic;

@Component({
  selector: 'jhi-care-provider-update',
  templateUrl: './care-provider-update.component.html'
})
export class CareProviderUpdateComponent implements OnInit {
  isSaving = false;
  clinics: IClinic[] = [];

  editForm = this.fb.group({
    id: [],
    firstName: [null, [Validators.required]],
    lastName: [null, [Validators.required]],
    email: [null, [Validators.required, Validators.pattern('^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$')]],
    officeAdministrator: [],
    clinic: []
  });

  constructor(
    protected careProviderService: CareProviderService,
    protected clinicService: ClinicService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ careProvider }) => {
      this.updateForm(careProvider);

      this.clinicService.query().subscribe((res: HttpResponse<IClinic[]>) => (this.clinics = res.body || []));
    });
  }

  updateForm(careProvider: ICareProvider): void {
    this.editForm.patchValue({
      id: careProvider.id,
      firstName: careProvider.firstName,
      lastName: careProvider.lastName,
      email: careProvider.email,
      officeAdministrator: careProvider.officeAdministrator,
      clinic: careProvider.clinic
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const careProvider = this.createFromForm();
    if (careProvider.id !== undefined) {
      this.subscribeToSaveResponse(this.careProviderService.update(careProvider));
    } else {
      this.subscribeToSaveResponse(this.careProviderService.create(careProvider));
    }
  }

  private createFromForm(): ICareProvider {
    return {
      ...new CareProvider(),
      id: this.editForm.get(['id'])!.value,
      firstName: this.editForm.get(['firstName'])!.value,
      lastName: this.editForm.get(['lastName'])!.value,
      email: this.editForm.get(['email'])!.value,
      officeAdministrator: this.editForm.get(['officeAdministrator'])!.value,
      clinic: this.editForm.get(['clinic'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICareProvider>>): void {
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
