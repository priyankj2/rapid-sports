import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TestResultService } from './test-result.service';
import { ITestResult } from '../../shared/model/test-result.model';

@Component({
  templateUrl: './test-result-delete-dialog.component.html'
})
export class TestResultDeleteDialogComponent {
  testResult?: ITestResult;

  constructor(
    protected testResultService: TestResultService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.testResultService.delete(id).subscribe(() => {
      this.eventManager.broadcast('testResultListModification');
      this.activeModal.close();
    });
  }
}
