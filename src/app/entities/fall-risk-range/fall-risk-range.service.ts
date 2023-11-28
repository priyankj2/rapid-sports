import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IFallRiskRange } from 'app/shared/model/fall-risk-range.model';

type EntityResponseType = HttpResponse<IFallRiskRange>;
type EntityArrayResponseType = HttpResponse<IFallRiskRange[]>;

@Injectable({ providedIn: 'root' })
export class FallRiskRangeService {
  public resourceUrl = SERVER_API_URL + 'api/fall-risk-ranges';

  constructor(protected http: HttpClient) {}

  create(fallRiskRange: IFallRiskRange): Observable<EntityResponseType> {
    return this.http.post<IFallRiskRange>(this.resourceUrl, fallRiskRange, { observe: 'response' });
  }

  update(fallRiskRange: IFallRiskRange): Observable<EntityResponseType> {
    return this.http.put<IFallRiskRange>(this.resourceUrl, fallRiskRange, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IFallRiskRange>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFallRiskRange[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
