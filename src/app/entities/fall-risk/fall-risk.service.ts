import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IFallRisk } from 'app/shared/model/fall-risk.model';

type EntityResponseType = HttpResponse<IFallRisk>;
type EntityArrayResponseType = HttpResponse<IFallRisk[]>;

@Injectable({ providedIn: 'root' })
export class FallRiskService {
  public resourceUrl = SERVER_API_URL + 'api/fall-risks';

  constructor(protected http: HttpClient) {}

  create(fallRisk: IFallRisk): Observable<EntityResponseType> {
    return this.http.post<IFallRisk>(this.resourceUrl, fallRisk, { observe: 'response' });
  }

  update(fallRisk: IFallRisk): Observable<EntityResponseType> {
    return this.http.put<IFallRisk>(this.resourceUrl, fallRisk, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IFallRisk>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFallRisk[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
