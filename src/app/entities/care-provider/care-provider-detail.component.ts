import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICareProvider } from 'app/shared/model/care-provider.model';

@Component({
  selector: 'jhi-care-provider-detail',
  templateUrl: './care-provider-detail.component.html'
})
export class CareProviderDetailComponent implements OnInit {
  careProvider: ICareProvider | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ careProvider }) => (this.careProvider = careProvider));
  }

  previousState(): void {
    window.history.back();
  }
}
