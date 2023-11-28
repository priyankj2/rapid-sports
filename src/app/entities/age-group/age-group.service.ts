import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IAgeGroup } from 'app/shared/model/age-group.model';

type EntityResponseType = HttpResponse<IAgeGroup>;
type EntityArrayResponseType = HttpResponse<IAgeGroup[]>;

@Injectable({ providedIn: 'root' })
export class AgeGroupService {
  public resourceUrl = SERVER_API_URL + 'api/age-groups';

  constructor(protected http: HttpClient) {}

  create(ageGroup: IAgeGroup): Observable<EntityResponseType> {
    return this.http.post<IAgeGroup>(this.resourceUrl, ageGroup, { observe: 'response' });
  }

  update(ageGroup: IAgeGroup): Observable<EntityResponseType> {
    return this.http.put<IAgeGroup>(this.resourceUrl, ageGroup, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAgeGroup>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAgeGroup[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
