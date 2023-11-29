import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { TestResultService } from './test-result.service';
import { TestResultDeleteDialogComponent } from './test-result-delete-dialog.component';
import { ITestResult } from '../../shared/model/test-result.model';

@Component({
  selector: 'jhi-test-result',
  templateUrl: './test-result.component.html'
})
export class TestResultComponent implements OnInit, OnDestroy {
  testResults?: ITestResult[];
  eventSubscriber?: Subscription;

  constructor(protected testResultService: TestResultService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.testResultService.query().subscribe((res: HttpResponse<ITestResult[]>) => (this.testResults = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInTestResults();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ITestResult): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInTestResults(): void {
    this.eventSubscriber = this.eventManager.subscribe('testResultListModification', () => this.loadAll());
  }

  delete(testResult: ITestResult): void {
    const modalRef = this.modalService.open(TestResultDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.testResult = testResult;
  }
}
