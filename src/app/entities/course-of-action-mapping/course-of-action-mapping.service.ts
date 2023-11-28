import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ICourseOfActionMapping } from 'app/shared/model/course-of-action-mapping.model';

type EntityResponseType = HttpResponse<ICourseOfActionMapping>;
type EntityArrayResponseType = HttpResponse<ICourseOfActionMapping[]>;

@Injectable({ providedIn: 'root' })
export class CourseOfActionMappingService {
  public resourceUrl = SERVER_API_URL + 'api/course-of-action-mappings';

  constructor(protected http: HttpClient) {}

  create(courseOfActionMapping: ICourseOfActionMapping): Observable<EntityResponseType> {
    return this.http.post<ICourseOfActionMapping>(this.resourceUrl, courseOfActionMapping, { observe: 'response' });
  }

  update(courseOfActionMapping: ICourseOfActionMapping): Observable<EntityResponseType> {
    return this.http.put<ICourseOfActionMapping>(this.resourceUrl, courseOfActionMapping, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICourseOfActionMapping>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICourseOfActionMapping[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
