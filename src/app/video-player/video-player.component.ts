import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core/';
import {
  CameraPreviewOptions,
  CameraPreview,
  CameraPreviewPictureOptions,
} from '@capacitor-community/camera-preview';
import { VideoService } from '../services/video.service';
@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrl: './video-player.component.css',
})
export class VideoPlayerComponent implements OnInit {
  started: boolean = false;
  selectedVideoType: string = 'delayed';
  public displayControls = true;
  stopped:boolean=false;
  images: string[] = [];

  constructor(
    private videoService: VideoService
  ) {}
  
  ngOnInit(): void {
    // this.startVideo();
    this.startCamera();
  }
  
  startCamera() {
    // this.startVideo();
    if(this.stopped){
      this.images=[];
    }
    CameraPreview.start({ parent: 'cameraPreview' }).then(() => {
      this.started = true;
    });
    const cameraPreviewOptions: CameraPreviewOptions = {
      position: 'rear',
      height: 200,
      width: 200,
      x:10,
      y:10
    };
    CameraPreview.start(cameraPreviewOptions).then(() => {});
  }

  stopCam() {
    CameraPreview.stop().then(() => {
      this.started = false;
      for(let i=0 ; i<this.images.length ; i++){
        localStorage.setItem('image',this.images[i])
      }
      // localStorage.setItem('image',this.images[0])
      this.stopped=true;
    });
  }

  async startVideo(){
    document.body.classList.remove('overlay');
    const delay = 5000;
    const mimeType = `video/webm; codecs="vp8"`;
    const stream = await this.getStream();
    const realtimeVideo = document.querySelector('#video') as HTMLVideoElement;
    realtimeVideo.srcObject = stream;
    const mediaSource = new MediaSource();
    const delayedVideo = document.querySelector('#video') as HTMLVideoElement;
    delayedVideo.src = URL.createObjectURL(mediaSource);
    await new Promise(res => mediaSource.addEventListener('sourceopen', res, { once: true }));
    const sourceBuffer = mediaSource.addSourceBuffer(mimeType);
    const recorder = new (window as any).MediaRecorder(stream, { mimeType });
    const chunks = [];
    recorder.ondataavailable = async (event: any) => {
      const { data } = event;
      if (mediaSource.readyState !== 'open' || !data.size) {
        return;
      }
      sourceBuffer.appendBuffer(await data.arrayBuffer());
    };
    delayedVideo.pause();
    recorder.start(50);
    delayedVideo.style.transform = 'scaleX(-1)';
    realtimeVideo.style.transform = 'scaleX(-1)';
    setTimeout(() => delayedVideo.play(), 5000);
  }
  
  async getStream() {
    return navigator.mediaDevices.getUserMedia({ video: true });
  }

  captureImage() {
    const CameraPreviewPictureOptions: CameraPreviewPictureOptions = {
      quality: 100,
      height: 100,
      width: 100,
    };
    CameraPreview.capture(CameraPreviewPictureOptions).then((res) => {
      const imageData = 'data:image/png;base64,' + res.value;
      this.videoService.storeImage(imageData)
      this.images.push(imageData);
    });
    console.log(this.images);
  }

  flip() {
    CameraPreview.flip();
  }

  playVideo(){
    const video = <HTMLVideoElement>document.getElementById('video');
    if (video) {
      video.play();
    }
  }

  pauseVideo(){
    const video = <HTMLVideoElement>document.getElementById('video');
    if (video) {
      video.pause();
    }
  }

  startRecording() {
    const cameraPreviewOptions: CameraPreviewOptions = {
      position: 'front',
      width: window.screen.width,
      height: window.screen.height,
    };
    
    CameraPreview.startRecordVideo(cameraPreviewOptions);
  }

  async stopRecording() {
    const resultRecordVideo = await CameraPreview.stopRecordVideo();
  }
}
