import { Component, OnInit, ViewChild } from '@angular/core';
type RecordingState = 'NONE' | 'RECORDING' | 'RECORDED';
type VideoState = 'Played' | 'Paused';
declare var MediaRecorder: any;
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
  @ViewChild('videoElement') videoElement: any;
  @ViewChild('recordedVideo') recordVideoElement: any;
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
  
  mediaRecorder: any;
  recordedBlobs!: Blob[];
  isRecording: boolean = false;
  downloadUrl!: string;
  stream!: MediaStream;
  storeVideos: any[]  = [];
  showRecordedVideo = false;
  constructor(
  ) {}
  
  ngOnInit(): void {
    this.startVideo();
    this.start();
  }

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

  async startVideo() {
    document.body.classList.remove('overlay');
    const mimeType = `video/webm; codecs="vp8"`;
    const stream = await this.getStream();
    navigator.mediaDevices
      .getUserMedia({
        video: {
          width: 360
        }
      })
      .then(stream => {
        this.videoElement = this.videoElement.nativeElement;
        this.recordVideoElement = this.recordVideoElement.nativeElement;

        this.stream = stream;
        this.videoElement.srcObject = this.stream;
      });
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
    this.videoElement.nativeElement.style.transform = 'scaleX(-1)';
    setTimeout(() => delayedVideo.play(), 5000);
  }

  async getStream() {
    return navigator.mediaDevices.getUserMedia({ video: true });
  }

  togglePlayPause() {
    if (this.videoElement.paused) {
      this.videoElement.play();
      this.isPlaying = true;
    } else {
      this.videoElement.pause();
      this.isPlaying = false;
    }
  }

  startRecording() {
    this.recordedBlobs = [];
    let options: any = { mimeType: 'video/webm' };

    try {
      this.mediaRecorder = new MediaRecorder(this.stream, options);
    } catch (err) {
      console.log(err);
    }
    this.mediaRecorder.start(); // collect 100ms of data
    this.isRecording = !this.isRecording;
    this.onDataAvailableEvent();
    this.onStopRecordingEvent();
  }

  stopRecording() {
    this.mediaRecorder.stop();
    this.isRecording = !this.isRecording;
  }

  onDataAvailableEvent() {
    try {
      this.mediaRecorder.ondataavailable = (event: any) => {
        if (event.data && event.data.size > 0) {
          this.recordedBlobs.push(event.data);
        }
      };
    } catch (error) {
      console.log(error);
    }
  }

  onStopRecordingEvent() {
    try {
      this.mediaRecorder.onstop = (event: Event) => {
        const videoBuffer = new Blob(this.recordedBlobs, {
          type: 'video/webm'
        });
        this.storeVideos.push(videoBuffer);
        // this.downloadUrl = window.URL.createObjectURL(videoBuffer); // you can download with <a> tag
        // const link = document.createElement('a');
        // link.href = this.downloadUrl;
        // link.download = 'video.webm';
        // link.click();
        // this.recordVideoElement.src = window.URL.createObjectURL(videoBuffer)
        // this.recordVideoElement.play();
      };
    } catch (error) {
      console.log(error);
    }
  }

  playRecordedVideo() {
    if (this.storeVideos.length > 0) {
      const url = window.URL.createObjectURL(this.storeVideos[0]);
      this.recordVideoElement.src = url;
      this.recordVideoElement.play();
      this.showRecordedVideo = true;
    }
  }

  captureImage() {
    let canvas = document.querySelector("#canvas") as any;
    canvas.getContext('2d').drawImage(this.videoElement, 0, 0, canvas.width, canvas.height);
   	let image_data_url = canvas.toDataURL('image/jpeg');

   	// data url of the image
   	console.log(image_data_url);
  }

  
  // playRealTimeVideo() {
  //   const realtimeVideo = document.querySelector('#realtimeVideo') as HTMLVideoElement;
  //   realtimeVideo.play();
  // }

  pauseDelayedVideo() {
    const delayedVideo = document.querySelector('#delayedVideo') as HTMLVideoElement;
    delayedVideo.pause();
  }

  startDelayedVideo() {
    const delayedVideo = document.querySelector('#delayedVideo') as HTMLVideoElement;
    this.videoState = 'Played';
    delayedVideo.play();
  }

  // toggleDelayedVideoFullscreen() {
  //   const delayedVideo = document.querySelector('#delayedVideo') as HTMLVideoElement;
  //   delayedVideo.play();
  // }

  // switchVideos() {
  //   this.isLive = !this.isLive;
  // }

  // pauseRealTimeVideo() {
  //   const realtimeVideo = document.querySelector('#realtimeVideo') as HTMLVideoElement;
  //   realtimeVideo.pause();
  //   this.buttonValue = false;
  // }

  // seekVideo(event: any) {
  //   const delayedVideo = document.querySelector('#delayedVideo') as HTMLVideoElement;
  //   const newValue = parseFloat(event.target.value);
  //   const newTime = (delayedVideo.duration * newValue) / 100;
  //   delayedVideo.currentTime = newTime;
  //   this.currentSeekTime = newValue; // Trigger change detection to update the UI
  // }

  // calculateCurrentTime(): string {
  //   const delayedVideo = document.querySelector('#delayedVideo') as HTMLVideoElement;
  //   if (delayedVideo) {
  //     const currentTime = (delayedVideo.currentTime / delayedVideo.duration) * 100;
  //     return `${Math.round(currentTime)}%`;
  //   }
  //   return '0%';
  // }

  // setPlaybackSpeed(speed: number): void {
  //   const realtimeVideo = document.querySelector('#realtimeVideo') as HTMLVideoElement;
  //   const delayedVideo = document.querySelector('#delayedVideo') as HTMLVideoElement;

  //   // Set the playback speed for both videos
  //   // realtimeVideo.playbackRate = speed;
  //   delayedVideo.playbackRate = speed;
  //   this.selectedPlaybackSpeed = speed;
  // }

  switchVideoType(): void {
    if (this.selectedVideoType === 'live') {
      this.isLive = false;
    } else if (this.selectedVideoType === 'delayed') {
      this.isLive = true;
    }
  }


}
