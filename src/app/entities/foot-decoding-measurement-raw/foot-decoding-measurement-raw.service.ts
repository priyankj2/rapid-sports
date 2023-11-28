import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IFootDecodingMeasurementRaw } from 'app/shared/model/foot-decoding-measurement-raw.model';

type EntityResponseType = HttpResponse<IFootDecodingMeasurementRaw>;
type EntityArrayResponseType = HttpResponse<IFootDecodingMeasurementRaw[]>;

@Injectable({ providedIn: 'root' })
export class FootDecodingMeasurementRawService {
  public resourceUrl = SERVER_API_URL + 'api/foot-decoding-measurement-raws';

  constructor(protected http: HttpClient) {}

  create(footDecodingMeasurementRaw: IFootDecodingMeasurementRaw): Observable<EntityResponseType> {
    return this.http.post<IFootDecodingMeasurementRaw>(this.resourceUrl, footDecodingMeasurementRaw, { observe: 'response' });
  }

  update(footDecodingMeasurementRaw: IFootDecodingMeasurementRaw): Observable<EntityResponseType> {
    return this.http.put<IFootDecodingMeasurementRaw>(this.resourceUrl, footDecodingMeasurementRaw, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IFootDecodingMeasurementRaw>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IFootDecodingMeasurementRaw[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
