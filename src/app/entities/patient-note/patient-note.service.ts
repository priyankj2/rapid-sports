import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPatientNote } from 'app/shared/model/patient-note.model';

type EntityResponseType = HttpResponse<IPatientNote>;
type EntityArrayResponseType = HttpResponse<IPatientNote[]>;

@Injectable({ providedIn: 'root' })
export class PatientNoteService {
  public resourceUrl = SERVER_API_URL + 'api/patient-notes';

  constructor(protected http: HttpClient) {}

  create(patientNote: IPatientNote): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(patientNote);
    return this.http
      .post<IPatientNote>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(patientNote: IPatientNote): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(patientNote);
    return this.http
      .put<IPatientNote>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IPatientNote>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPatientNote[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(patientNote: IPatientNote): IPatientNote {
    const copy: IPatientNote = Object.assign({}, patientNote, {
      dateCreated: patientNote.dateCreated && patientNote.dateCreated.isValid() ? patientNote.dateCreated.toJSON() : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateCreated = res.body.dateCreated ? moment(res.body.dateCreated) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((patientNote: IPatientNote) => {
        patientNote.dateCreated = patientNote.dateCreated ? moment(patientNote.dateCreated) : undefined;
      });
    }
    return res;
  }
}
