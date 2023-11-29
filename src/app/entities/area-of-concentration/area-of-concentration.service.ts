import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER_API_URL } from '../../app.constants';
import { IAreaOfConcentration } from '../../shared/model/area-of-concentration.model';
import { createRequestOption } from '../../shared/util/request-util';



type EntityResponseType = HttpResponse<IAreaOfConcentration>;
type EntityArrayResponseType = HttpResponse<IAreaOfConcentration[]>;

@Injectable({ providedIn: 'root' })
export class AreaOfConcentrationService {
  public resourceUrl = SERVER_API_URL + 'api/area-of-concentrations';

  constructor(protected http: HttpClient) {}

  create(areaOfConcentration: IAreaOfConcentration): Observable<EntityResponseType> {
    return this.http.post<IAreaOfConcentration>(this.resourceUrl, areaOfConcentration, { observe: 'response' });
  }

  update(areaOfConcentration: IAreaOfConcentration): Observable<EntityResponseType> {
    return this.http.put<IAreaOfConcentration>(this.resourceUrl, areaOfConcentration, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAreaOfConcentration>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAreaOfConcentration[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
