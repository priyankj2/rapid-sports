import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import moment from 'moment';
import { SERVER_API_URL } from '../../app.constants';
import { IPatientCourseOfAction } from '../../shared/model/patient-course-of-action.model';
import { createRequestOption } from '../../shared/util/request-util';



type EntityResponseType = HttpResponse<IPatientCourseOfAction>;
type EntityArrayResponseType = HttpResponse<IPatientCourseOfAction[]>;

@Injectable({ providedIn: 'root' })
export class PatientCourseOfActionService {
  public resourceUrl = SERVER_API_URL + 'api/patient-course-of-actions';

  constructor(protected http: HttpClient) {}

  create(patientCourseOfAction: IPatientCourseOfAction): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(patientCourseOfAction);
    return this.http
      .post<IPatientCourseOfAction>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(patientCourseOfAction: IPatientCourseOfAction): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(patientCourseOfAction);
    return this.http
      .put<IPatientCourseOfAction>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IPatientCourseOfAction>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  findMostRecentForPatientObservation(patientId: number, observationId: number): Observable<EntityResponseType> {
    return this.http
      .get<IPatientCourseOfAction>(`${this.resourceUrl}/most-recent/${patientId}/${observationId}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPatientCourseOfAction[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(patientCourseOfAction: IPatientCourseOfAction): IPatientCourseOfAction {
    const copy: IPatientCourseOfAction = Object.assign({}, patientCourseOfAction, {
      assignmentDate:
        patientCourseOfAction.assignmentDate && patientCourseOfAction.assignmentDate.isValid()
          ? patientCourseOfAction.assignmentDate.toJSON()
          : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.assignmentDate = res.body.assignmentDate ? moment(res.body.assignmentDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((patientCourseOfAction: IPatientCourseOfAction) => {
        patientCourseOfAction.assignmentDate = patientCourseOfAction.assignmentDate
          ? moment(patientCourseOfAction.assignmentDate)
          : undefined;
      });
    }
    return res;
  }
}
