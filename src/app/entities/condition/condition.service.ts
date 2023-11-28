import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICondition } from 'app/shared/model/condition.model';

type EntityResponseType = HttpResponse<ICondition>;
type EntityArrayResponseType = HttpResponse<ICondition[]>;

@Injectable({ providedIn: 'root' })
export class ConditionService {
  public resourceUrl = SERVER_API_URL + 'api/conditions';

  constructor(protected http: HttpClient) {}

  create(condition: ICondition): Observable<EntityResponseType> {
    return this.http.post<ICondition>(this.resourceUrl, condition, { observe: 'response' });
  }

  update(condition: ICondition): Observable<EntityResponseType> {
    return this.http.put<ICondition>(this.resourceUrl, condition, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICondition>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICondition[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
