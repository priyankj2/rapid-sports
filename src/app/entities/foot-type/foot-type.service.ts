import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IFootType } from 'app/shared/model/foot-type.model';

type EntityResponseType = HttpResponse<IFootType>;
type EntityArrayResponseType = HttpResponse<IFootType[]>;

@Injectable({ providedIn: 'root' })
export class FootTypeService {
  public resourceUrl = SERVER_API_URL + 'api/foot-types';

  constructor(protected http: HttpClient) {}

  create(footType: IFootType): Observable<EntityResponseType> {
    return this.http.post<IFootType>(this.resourceUrl, footType, { observe: 'response' });
  }

  update(footType: IFootType): Observable<EntityResponseType> {
    return this.http.put<IFootType>(this.resourceUrl, footType, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IFootType>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFootType[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
