import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IStateOrProvince } from 'app/shared/model/state-or-province.model';

type EntityResponseType = HttpResponse<IStateOrProvince>;
type EntityArrayResponseType = HttpResponse<IStateOrProvince[]>;

@Injectable({ providedIn: 'root' })
export class StateOrProvinceService {
  public resourceUrl = SERVER_API_URL + 'api/state-or-provinces';

  constructor(protected http: HttpClient) {}

  create(stateOrProvince: IStateOrProvince): Observable<EntityResponseType> {
    return this.http.post<IStateOrProvince>(this.resourceUrl, stateOrProvince, { observe: 'response' });
  }

  update(stateOrProvince: IStateOrProvince): Observable<EntityResponseType> {
    return this.http.put<IStateOrProvince>(this.resourceUrl, stateOrProvince, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IStateOrProvince>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IStateOrProvince[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
