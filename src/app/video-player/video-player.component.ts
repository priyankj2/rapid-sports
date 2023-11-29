import { Component, OnInit, ViewChild } from '@angular/core';
import { VideoService } from '../services/video.service';
type RecordingState = 'NONE' | 'RECORDING' | 'RECORDED';
type VideoState = 'Played' | 'Paused';
@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrl: './video-player.component.css',
})
export class VideoPlayerComponent implements OnInit {
  started: boolean = false;
  public displayControls = true;
  stopped:boolean=false;
  images: string[] = [];
  //
  @ViewChild('videoElement')
  videoElement: any;
  selectedVideoType: string = 'delayed';
  buttonValue: boolean = true;
  isLive: boolean = true;
  isPlaying = true;
  recordingAdded = false;
  video: any;
  cameras: MediaDeviceInfo[] = [];
  selectedCamera?: MediaDeviceInfo;
  cameraListSupported = true;
  state: RecordingState = 'NONE';
  videoState: VideoState = 'Paused';
  videoBlobUrl: any = null;
  currentSeekTime = 0; // Initialize to 0
  strideLength: any;
  // Inside your component class
  playbackSpeedOptions: { label: string; value: number }[] = [
    { label: 'Normal Speed', value: 1 },
    { label: 'Fast Forward', value: 2 },
    { label: 'Slow Motion', value: 0.5 }
  ];
  selectedPlaybackSpeed: number = 1; // Default to normal speed
  //

  constructor(
    private videoService: VideoService
  ) {}
  
  ngOnInit(): void {
    this.startVideo();
    this.start();
  }

  //

  initCamera(config: any): void {
    const browser = navigator as any;

    browser.getUserMedia = browser.getUserMedia || browser.webkitGetUserMedia || browser.mozGetUserMedia || browser.msGetUserMedia;

    browser.mediaDevices.getUserMedia(config).then((stream: MediaStream) => {
      this.video.srcObject = stream;
      this.video.play();
    });
  }

  start(): void {
    if (this.selectedCamera) {
      this.initCamera({ video: { deviceId: this.selectedCamera.deviceId } });
    } else {
      this.initCamera({ video: true, audio: false });
    }
  }

  stop(): void {
    if (this.video && this.video.srcObject) {
      const stream = this.video.srcObject;
      this.video.pause();
      this.video.src = '';
      stream.getTracks()[0].stop();
    }
  }

  switchVideoType(): void {
    if (this.selectedVideoType === 'live') {
      this.isLive = false;
    } else if (this.selectedVideoType === 'delayed') {
      this.isLive = true;
    }
  }
  async startVideo() {
    document.body.classList.remove('overlay');
    const delay = 5000;
    const mimeType = `video/webm; codecs="vp8"`;
    const stream = await this.getStream();
    const realtimeVideo = document.querySelector('#realtimeVideo') as HTMLVideoElement;
    realtimeVideo.srcObject = stream;
    const mediaSource = new MediaSource();
    const delayedVideo = document.querySelector('#delayedVideo') as HTMLVideoElement;
    delayedVideo.src = URL.createObjectURL(mediaSource);
    await new Promise(res => mediaSource.addEventListener('sourceopen', res, { once: true }));
    const sourceBuffer = mediaSource.addSourceBuffer(mimeType);

    // Use a type assertion to declare the type of MediaRecorder
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
  playRealTimeVideo() {
    console.log('hello');
    const realtimeVideo = document.querySelector('#realtimeVideo') as HTMLVideoElement;
    realtimeVideo.play();
  }
  togglePlayPause() {
    // const video = this.videoElement.nativeElement;
    const realtimeVideo = document.querySelector('#realtimeVideo') as HTMLVideoElement;
    if (realtimeVideo.paused) {
      realtimeVideo.play();
      this.isPlaying = true;
    } else {
      realtimeVideo.pause();
      this.isPlaying = false;
    }
  }
  pauseDelayedVideo() {
    const delayedVideo = document.querySelector('#delayedVideo') as HTMLVideoElement;
    delayedVideo.pause();
  }
  startDelayedVideo() {
    const delayedVideo = document.querySelector('#delayedVideo') as HTMLVideoElement;
    this.videoState = 'Played';
    delayedVideo.play();
  }
  toggleDelayedVideoFullscreen() {
    const delayedVideo = document.querySelector('#delayedVideo') as HTMLVideoElement;
    delayedVideo.play();
  }
  switchVideos() {
    this.isLive = !this.isLive;
  }
  pauseRealTimeVideo() {
    // eslint-disable-next-line no-debugger
    debugger;
    console.log('hello');
    const realtimeVideo = document.querySelector('#realtimeVideo') as HTMLVideoElement;
    realtimeVideo.pause();
    this.buttonValue = false;
  }
  seekVideo(event: any) {
    const delayedVideo = document.querySelector('#delayedVideo') as HTMLVideoElement;
    const newValue = parseFloat(event.target.value);
    const newTime = (delayedVideo.duration * newValue) / 100;
    delayedVideo.currentTime = newTime;
    this.currentSeekTime = newValue; // Trigger change detection to update the UI
  }
  calculateCurrentTime(): string {
    const delayedVideo = document.querySelector('#delayedVideo') as HTMLVideoElement;
    if (delayedVideo) {
      const currentTime = (delayedVideo.currentTime / delayedVideo.duration) * 100;
      return `${Math.round(currentTime)}%`;
    }
    return '0%';
  }
  setPlaybackSpeed(speed: number): void {
    const realtimeVideo = document.querySelector('#realtimeVideo') as HTMLVideoElement;
    const delayedVideo = document.querySelector('#delayedVideo') as HTMLVideoElement;

    // Set the playback speed for both videos
    // realtimeVideo.playbackRate = speed;
    delayedVideo.playbackRate = speed;
    this.selectedPlaybackSpeed = speed;
  }
  //
}
