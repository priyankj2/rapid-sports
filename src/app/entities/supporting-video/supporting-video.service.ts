import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ISupportingVideo } from 'app/shared/model/supporting-video.model';

type EntityResponseType = HttpResponse<ISupportingVideo>;
type EntityArrayResponseType = HttpResponse<ISupportingVideo[]>;

@Injectable({ providedIn: 'root' })
export class SupportingVideoService {
  public resourceUrl = SERVER_API_URL + 'api/supporting-videos';
  public resourceUrlV2 = SERVER_API_URL + 'api/v2/supporting-videos';

  constructor(protected http: HttpClient) {}

  create(supportingVideo: ISupportingVideo): Observable<EntityResponseType> {
    return this.http.post<ISupportingVideo>(this.resourceUrl, supportingVideo, { observe: 'response' });
  }

  createV2(supportingVideo: ISupportingVideo, videoFiles?: Array<File>): Observable<EntityResponseType> {
    if (videoFiles && videoFiles.length) {
      const videoFile = videoFiles[0];
      const formData = new FormData();
      formData.append('supportingVideoString', JSON.stringify(supportingVideo));
      formData.append('videoFile', videoFile);
      return this.http.post<ISupportingVideo>(this.resourceUrlV2, formData, { observe: 'response' });
    }
    return this.create(supportingVideo);
  }

  update(supportingVideo: ISupportingVideo): Observable<EntityResponseType> {
    return this.http.put<ISupportingVideo>(this.resourceUrl, supportingVideo, { observe: 'response' });
  }

  updateV2(supportingVideo: ISupportingVideo, videoFiles?: Array<File>): Observable<EntityResponseType> {
    if (videoFiles && videoFiles.length) {
      const videoFile = videoFiles[0];
      const formData = new FormData();
      formData.append('supportingVideoString', JSON.stringify(supportingVideo));
      formData.append('videoFile', videoFile);
      return this.http.put<ISupportingVideo>(this.resourceUrlV2, formData, { observe: 'response' });
    }
    return this.update(supportingVideo);
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISupportingVideo>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISupportingVideo[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
