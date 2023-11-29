import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { SERVER_API_URL } from '../../app.constants';
import { IAssessment } from '../../shared/model/assessment.model';
import { IPatientAssessmentData } from '../../shared/model/patient-assessment-data.model';
import { createRequestOption } from '../../shared/util/request-util';


type EntityResponseType = HttpResponse<IAssessment>;
type EntityArrayResponseType = HttpResponse<IAssessment[]>;
type EntityDataResponseType = HttpResponse<IPatientAssessmentData>;

@Injectable({ providedIn: 'root' })
export class AssessmentService {
  public resourceUrl = SERVER_API_URL + 'api/assessments';

  constructor(protected http: HttpClient) {}

  create(assessment: IAssessment): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(assessment);
    return this.http
      .post<IAssessment>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(assessment: IAssessment): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(assessment);
    return this.http
      .put<IAssessment>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IAssessment>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  findPatientAssessmentData(patientId: number, observationCode: string): Observable<EntityDataResponseType> {
    return this.http
      .get<IPatientAssessmentData>(`${this.resourceUrl}/data/${patientId}/${observationCode}`, { observe: 'response' })
      .pipe(map((res: EntityDataResponseType) => this.convertDateDataWrapperFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IAssessment[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(assessment: IAssessment): IAssessment {
    const copy: IAssessment = Object.assign({}, assessment, {
      startTime: assessment.startTime && assessment.startTime.isValid() ? assessment.startTime.toJSON() : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.startTime = res.body.startTime ? moment(res.body.startTime) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((assessment: IAssessment) => {
        assessment.startTime = assessment.startTime ? moment(assessment.startTime) : undefined;
      });
    }
    return res;
  }

  protected convertDateDataWrapperFromServer(res: EntityDataResponseType): EntityDataResponseType {
    if (res.body) {
      if (res.body.baseline) {
        res.body.baseline.startTime = res.body.baseline.startTime ? moment(res.body.baseline.startTime) : undefined;
      }
      if (res.body.mostRecent) {
        res.body.mostRecent.startTime = res.body.mostRecent.startTime ? moment(res.body.mostRecent.startTime) : undefined;
      }
      if (res.body.postBaseline) {
        res.body.postBaseline.forEach((assessment: IAssessment) => {
          assessment.startTime = assessment.startTime ? moment(assessment.startTime) : undefined;
        });
      }
    }
    return res;
  }
}
