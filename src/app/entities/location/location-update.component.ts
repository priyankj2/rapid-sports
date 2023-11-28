import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ILocation, Location } from 'app/shared/model/location.model';
import { LocationService } from './location.service';
import { IStateOrProvince } from 'app/shared/model/state-or-province.model';
import { StateOrProvinceService } from 'app/entities/state-or-province/state-or-province.service';
import { ICountry } from 'app/shared/model/country.model';
import { CountryService } from 'app/entities/country/country.service';
import { ICareProvider } from 'app/shared/model/care-provider.model';
import { CareProviderService } from 'app/entities/care-provider/care-provider.service';
import { IClinic } from 'app/shared/model/clinic.model';
import { ClinicService } from 'app/entities/clinic/clinic.service';

type SelectableEntity = IStateOrProvince | ICountry | ICareProvider | IClinic;

@Component({
  selector: 'jhi-location-update',
  templateUrl: './location-update.component.html'
})
export class LocationUpdateComponent implements OnInit {
  isSaving = false;
  stateorprovinces: IStateOrProvince[] = [];
  countries: ICountry[] = [];
  careproviders: ICareProvider[] = [];
  clinics: IClinic[] = [];

  editForm = this.fb.group({
    id: [],
    name: [null, [Validators.required]],
    streetAddress1: [],
    streetAddress2: [],
    city: [],
    postalCode: [],
    stateOrProvince: [],
    country: [],
    careProvider: [],
    clinic: []
  });

  constructor(
    protected locationService: LocationService,
    protected stateOrProvinceService: StateOrProvinceService,
    protected countryService: CountryService,
    protected careProviderService: CareProviderService,
    protected clinicService: ClinicService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ location }) => {
      this.updateForm(location);

      this.stateOrProvinceService
        .query({ size: 500 })
        .subscribe((res: HttpResponse<IStateOrProvince[]>) => (this.stateorprovinces = res.body || []));

      this.countryService.query().subscribe((res: HttpResponse<ICountry[]>) => (this.countries = res.body || []));

      this.careProviderService.query().subscribe((res: HttpResponse<ICareProvider[]>) => (this.careproviders = res.body || []));

      this.clinicService.query().subscribe((res: HttpResponse<IClinic[]>) => (this.clinics = res.body || []));
    });
  }

  updateForm(location: ILocation): void {
    this.editForm.patchValue({
      id: location.id,
      name: location.name,
      streetAddress1: location.streetAddress1,
      streetAddress2: location.streetAddress2,
      city: location.city,
      postalCode: location.postalCode,
      stateOrProvince: location.stateOrProvince,
      country: location.country,
      careProvider: location.careProvider,
      clinic: location.clinic
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const location = this.createFromForm();
    if (location.id !== undefined) {
      this.subscribeToSaveResponse(this.locationService.update(location));
    } else {
      this.subscribeToSaveResponse(this.locationService.create(location));
    }
  }

  private createFromForm(): ILocation {
    return {
      ...new Location(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      streetAddress1: this.editForm.get(['streetAddress1'])!.value,
      streetAddress2: this.editForm.get(['streetAddress2'])!.value,
      city: this.editForm.get(['city'])!.value,
      postalCode: this.editForm.get(['postalCode'])!.value,
      stateOrProvince: this.editForm.get(['stateOrProvince'])!.value,
      country: this.editForm.get(['country'])!.value,
      careProvider: this.editForm.get(['careProvider'])!.value,
      clinic: this.editForm.get(['clinic'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILocation>>): void {
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
