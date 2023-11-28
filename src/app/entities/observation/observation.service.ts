import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IObservation } from 'app/shared/model/observation.model';

type EntityResponseType = HttpResponse<IObservation>;
type EntityArrayResponseType = HttpResponse<IObservation[]>;

@Injectable({ providedIn: 'root' })
export class ObservationService {
  public resourceUrl = SERVER_API_URL + 'api/observations';

  constructor(protected http: HttpClient) {}

  create(observation: IObservation): Observable<EntityResponseType> {
    return this.http.post<IObservation>(this.resourceUrl, observation, { observe: 'response' });
  }

  update(observation: IObservation): Observable<EntityResponseType> {
    return this.http.put<IObservation>(this.resourceUrl, observation, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IObservation>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  findForPatient(id: number): Observable<EntityArrayResponseType> {
    return this.http.get<IObservation[]>(`${this.resourceUrl}/patient/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IObservation[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
