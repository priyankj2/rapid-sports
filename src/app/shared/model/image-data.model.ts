export interface IImageData {
  id?: number;
  sizeInBytes?: number;
  imageContentType?: string;
  image?: any;
}

export class ImageData implements IImageData {
  constructor(public id?: number, public sizeInBytes?: number, public imageContentType?: string, public image?: any) {}
}
