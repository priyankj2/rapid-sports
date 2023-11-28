import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IExerciseAssignment } from 'app/shared/model/exercise-assignment.model';

type EntityResponseType = HttpResponse<IExerciseAssignment>;
type EntityArrayResponseType = HttpResponse<IExerciseAssignment[]>;

@Injectable({ providedIn: 'root' })
export class ExerciseAssignmentService {
  public resourceUrl = SERVER_API_URL + 'api/exercise-assignments';

  constructor(protected http: HttpClient) {}

  create(exerciseAssignment: IExerciseAssignment): Observable<EntityResponseType> {
    return this.http.post<IExerciseAssignment>(this.resourceUrl, exerciseAssignment, { observe: 'response' });
  }

  update(exerciseAssignment: IExerciseAssignment): Observable<EntityResponseType> {
    return this.http.put<IExerciseAssignment>(this.resourceUrl, exerciseAssignment, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IExerciseAssignment>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IExerciseAssignment[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number | any): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
