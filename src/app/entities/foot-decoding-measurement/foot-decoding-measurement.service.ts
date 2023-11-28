import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IFootDecodingMeasurement } from 'app/shared/model/foot-decoding-measurement.model';

type EntityResponseType = HttpResponse<IFootDecodingMeasurement>;
type EntityArrayResponseType = HttpResponse<IFootDecodingMeasurement[]>;

@Injectable({ providedIn: 'root' })
export class FootDecodingMeasurementService {
  public resourceUrl = SERVER_API_URL + 'api/foot-decoding-measurements';

  constructor(protected http: HttpClient) {}

  create(footDecodingMeasurement: IFootDecodingMeasurement): Observable<EntityResponseType> {
    return this.http.post<IFootDecodingMeasurement>(this.resourceUrl, footDecodingMeasurement, { observe: 'response' });
  }

  update(footDecodingMeasurement: IFootDecodingMeasurement): Observable<EntityResponseType> {
    return this.http.put<IFootDecodingMeasurement>(this.resourceUrl, footDecodingMeasurement, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IFootDecodingMeasurement>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFootDecodingMeasurement[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
