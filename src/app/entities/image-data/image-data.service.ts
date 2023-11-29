import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

// import { SERVER_API_URL } from '';
// import { IImageData, ImageData } from 'app/shared/model/image-data.model';
import { JhiDataUtils } from 'ng-jhipster';
import { SERVER_API_URL } from '../../app.constants';
import { IImageData } from '../../shared/model/image-data.model';
import { createRequestOption } from '../../shared/util/request-util';

type EntityResponseType = HttpResponse<IImageData>;
type EntityArrayResponseType = HttpResponse<IImageData[]>;

@Injectable({ providedIn: 'root' })
export class ImageDataService {
  public resourceUrl = SERVER_API_URL + 'api/image-data';

  constructor(protected http: HttpClient, protected dataUtils: JhiDataUtils) {}

  create(imageData: IImageData): Observable<EntityResponseType> {
    return this.http.post<IImageData>(this.resourceUrl, imageData, { observe: 'response' });
  }

  update(imageData: IImageData): Observable<EntityResponseType> {
    return this.http.put<IImageData>(this.resourceUrl, imageData, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IImageData>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IImageData[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  fromBase64String(input: string): ImageData {
    if (input.includes('data:image/png;base64,')) {
      input = input.slice(22);
    }
    const imageData: IImageData = {
      ...new ImageData(),
      sizeInBytes: +this.dataUtils.byteSize(input),
      imageContentType: 'image/png',
      image: input
    };

    return imageData;
  }
}
