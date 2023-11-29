import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from '../../app.constants';
import { ICareProvider } from '../../shared/model/care-provider.model';
import { createRequestOption } from '../../shared/util/request-util';



type EntityResponseType = HttpResponse<ICareProvider>;
type EntityArrayResponseType = HttpResponse<ICareProvider[]>;

@Injectable({ providedIn: 'root' })
export class CareProviderService {
  public resourceUrl = SERVER_API_URL + 'api/care-providers';

  constructor(protected http: HttpClient) {}

  create(careProvider: ICareProvider): Observable<EntityResponseType> {
    return this.http.post<ICareProvider>(this.resourceUrl, careProvider, { observe: 'response' });
  }

  update(careProvider: ICareProvider): Observable<EntityResponseType> {
    return this.http.put<ICareProvider>(this.resourceUrl, careProvider, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICareProvider>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICareProvider[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
