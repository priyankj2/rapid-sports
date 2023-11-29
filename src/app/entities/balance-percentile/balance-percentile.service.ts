import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { SERVER_API_URL } from '../../app.constants';
import { IAgeGroup } from '../../shared/model/age-group.model';
import { IBalancePercentile, BalancePercentile } from '../../shared/model/balance-percentile.model';
import { Gender } from '../../shared/model/enumerations/gender.model';
import { TestCode } from '../../shared/model/enumerations/test-code.model';
import { IObservation } from '../../shared/model/observation.model';
import { createRequestOption } from '../../shared/util/request-util';
import { AgeGroupService } from '../age-group/age-group.service';



type EntityResponseType = HttpResponse<IBalancePercentile>;
type EntityArrayResponseType = HttpResponse<IBalancePercentile[]>;

@Injectable({ providedIn: 'root' })
export class BalancePercentileService implements OnDestroy {
  public resourceUrl = SERVER_API_URL + 'api/balance-percentiles';
  public bulkSaveUrl = this.resourceUrl + '/bulk';
  ageGroups: IAgeGroup[] = [];
  ageGroupByMinimumAge = [];
  ageGroupSubscription?: Subscription;
  translatedTestCodes = {
    BAL_1: 'STD',
    BAL_2: 'PRO',
    BAL_3: 'VIS',
    BAL_4: 'VES'
  };

  constructor(protected http: HttpClient, private ageGroupService: AgeGroupService) {
    this.ageGroupSubscription = this.ageGroupService.query().subscribe(ages => {
      if (ages.body) {
        this.ageGroups = ages.body;
        this.ageGroups.forEach(a => {
          const key = '' + a.minimumAge!;
          this.ageGroupByMinimumAge[key] = a;
        });
      }
    });
  }

  ngOnDestroy(): void {
    if (this.ageGroupSubscription != null) {
      this.ageGroupSubscription.unsubscribe();
    }
  }

  create(balancePercentile: IBalancePercentile): Observable<EntityResponseType> {
    return this.http.post<IBalancePercentile>(this.resourceUrl, balancePercentile, { observe: 'response' });
  }

  update(balancePercentile: IBalancePercentile): Observable<EntityResponseType> {
    return this.http.put<IBalancePercentile>(this.resourceUrl, balancePercentile, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IBalancePercentile>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IBalancePercentile[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  saveAll(
    observation: IObservation | undefined,
    gender: string | undefined,
    stepNumber: number | undefined,
    percentileData: {
      percentile: number;
      age0: number;
      age7: number;
      age9: number;
      age11: number;
      age14: number;
      age17: number;
      age20: number;
      age30: number;
      age40: number;
      age50: number;
      age60: number;
      age65: number;
      age70: number;
      age75: number;
      age80: number;
    }[]
  ): Observable<EntityArrayResponseType> | undefined {
    let testCode = `${observation!.internalCode}_${stepNumber}`;
    testCode = this.translateTestCode(testCode);
    const bulkUpdateUrl = `${this.bulkSaveUrl}/${testCode}`;
    const percentiles: IBalancePercentile[] = [];
    percentileData.forEach(d => {
      const percentile = d.percentile;
      this.ageGroups.forEach(ageGroup => {
        const ageGroupKey = 'age' + ageGroup.minimumAge;
        const minimumLength = d[ageGroupKey];
        if (minimumLength || minimumLength === 0) {
          const balancePercentile: IBalancePercentile = {
            ...new BalancePercentile(),
            gender: gender as Gender,
            testCode: testCode as TestCode,
            minimumLength,
            percentileRank: percentile,
            ageGroup
          };
          percentiles.push(balancePercentile);
        }
      });
    });
    return this.http.post<IBalancePercentile[]>(bulkUpdateUrl, percentiles, { observe: 'response' });
  }

  /**
   * If there is a matching code, return it. Otherwise return the original.
   * @param testCode
   * @private
   */
  private translateTestCode(testCode: string): string {
    return this.translatedTestCodes[testCode] ?? testCode;
  }
}
