import { Injectable } from '@angular/core';
import {
  Plugins
} from '@capacitor/core';
import { Filesystem,Directory } from '@capacitor/filesystem';
const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  public videos = [];
  private VIDEOS_KEY: string = 'videos';

  constructor() {}

  async loadVideos() {
    const videoList = await Storage['get']({ key: this.VIDEOS_KEY });
    this.videos = JSON.parse(videoList.value) || [];
    return this.videos;
  }

  async storeVideo(blob:Blob) {
    const fileName = new Date().getTime() + '.mp4';

    const base64Data = await this.convertBlobToBase64(blob) as string;
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Documents
    });

    // Add file to local array
    this.videos.unshift(savedFile.uri as never);

    // Write information to storage
    return Storage['set']({
      key: this.VIDEOS_KEY,
      value: JSON.stringify(this.videos)
    });
  }

  // Helper function
  private convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

  // Load video as base64 from url
  async getVideoUrl(fullPath: string) {
    const path = fullPath.substr(fullPath.lastIndexOf('/') + 1);
    const file = await Filesystem.readFile({
      path: path,
      directory: Directory.Documents
    });
    return `data:video/mp4;base64,${file.data}`;
  }
}
