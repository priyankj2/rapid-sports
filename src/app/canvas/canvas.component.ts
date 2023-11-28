/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/tslint/config */
import { Component, ElementRef, HostListener, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CenterOfPressure } from '../core/boditrak/center-of-pressure.model';
import { FrameSection } from '../core/boditrak/frame-section.model';
import { Frame } from '../core/boditrak/frame.model';
import { Graph } from '../core/boditrak/graph.model';
import { Grid } from '../core/boditrak/grid.model';
import { HAxis } from '../core/boditrak/h-axis.model';
import { Heatmap } from '../core/boditrak/heat-map.model';
import { NumericValues } from '../core/boditrak/numeric-values.model';
import { Quadrants } from '../core/boditrak/quadrants.model';
import { RingBuffer } from '../core/boditrak/ring-buffer.model';
import { Sensor } from '../core/boditrak/sensor.model';
import { Sizer } from '../core/boditrak/sizer.model';
import { VAxis } from '../core/boditrak/v-axis.model';
import { FootTypeCalculatorService } from '../core/foot-type-calculator.service';
import { TestManagementService } from '../core/test-management/test-management.service';
import { IFootType } from '../shared/model/foot-type.model';
import { IObservation } from '../shared/model/observation.model';
import { ObservationCategory } from '../shared/model/enumerations/observation-enum.model';
import { ImageDataService } from '../entities/image-data/image-data.service'
import { Subscription } from 'rxjs';
// import { JhiAlertService } from 'ng-jhipster';
import { StrideLengthService } from '../shared/stride-length.service';

@Component({
  selector: 'jhi-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements OnInit, OnDestroy {
  strideLength: any;
  private eventSource?: EventSource;
  @ViewChild('canvas', { static: true }) canvasRef?: ElementRef<HTMLCanvasElement>;
  testReadings = '';
  public current = 0;
  private maxSwingSwayX = 0;
  private maxSwingSwayY = 0;
  totalSway: any;
  leftFootType?: IFootType;
  rightFootType?: IFootType;

  frameTime = 'empty'; //need to set to empty => frameTime = 'empty'
  frameRate = '';
  leftForePressure = 0;
  leftRearPressure = 0;
  rightForePressure = 0;
  rightRearPressure = 0;
  @Input() delayTime = 0; // Default delay time is 5 seconds (5000 milliseconds)
  viewingResults = false;
  private centersOfPressure = new RingBuffer<CenterOfPressure>(10);
  private frames = new RingBuffer<Frame>(10);
  sensor: Sensor = new Sensor(32, 16, 0, 40, 0, 0, 'psi'); //maybe this controls the size
  private hmGraph?: Graph;
  private grid?: Grid;
  private ctx: CanvasRenderingContext2D | null | undefined;
  private canvas: HTMLCanvasElement | undefined;
  private heatmap?: Heatmap;
  private numericValues?: NumericValues;
  private sizer = new Sizer(1, 1, {}); //can be worked upon
  private timers = [];
  private animateTimer?: NodeJS.Timeout;
  private leftFoot?: FrameSection;
  private rightFoot?: FrameSection;
  showBoundingBox = true;
  private animation = 0;
  minX = 0;
  maxX = 0;
  middleX = 0;
  minY = 0;
  maxY = 0;
  middleY = 0;
  swayLength = 0;
  testDuration = 10;
  testDurationProgress = 0;
  testInterval: any = null;
  testInProgress = false;
  testComplete = false;
  selectedObservation?: IObservation;
  private saveAssessmentSubscription?: Subscription;

  constructor(
    private footTypeCalculator: FootTypeCalculatorService,
    public testManagementService: TestManagementService,
    private imageDataService: ImageDataService,
    // private alertService: JhiAlertService,
    private stridelength: StrideLengthService
  ) {}

  ngOnInit(): void {
    this.canvas = this.canvasRef?.nativeElement;
    this.ctx = this.canvasRef?.nativeElement.getContext('2d');
    const deviceAddress = this.testManagementService.deviceAddress;
    console.log(this.delayTime, 'delay time is working');
    if (deviceAddress) {
      this.connect(deviceAddress);
    }

    this.testManagementService.addressChanged.subscribe((address: string | undefined) => {
      if (address) {
        this.connect(address);
      }
    });
  }
  ngOnDestroy(): void {
    if (this.eventSource) {
      this.eventSource.close();
    }
  }
  public get roundedSwayLength(): number {
    return Math.round(this.swayLength);
  }
  public get leftTotalPressure(): number {
    return this.leftForePressure + this.leftRearPressure;
  }

  public get rightTotalPressure(): number {
    return this.rightForePressure + this.rightRearPressure;
  }

  public get totalPressure(): number {
    return this.leftForePressure + this.leftRearPressure + this.rightForePressure + this.rightRearPressure;
  }
  private connect(deviceAddress: string): void {
    if (this.eventSource) {
      this.eventSource.close();
    }
    this.eventSource = new EventSource('http://' + deviceAddress + '/api/sse');
    this.eventSource.addEventListener('sensors', (sensors: any) => {
      const sensorList: any[] = JSON.parse(sensors.data);
      const sensor = sensorList[0];
      // sensor.columns = 9;
      // sensor.rows = 31;
      this.setSensor(sensor as Sensor);
    });
    this.eventSource.addEventListener('newframe', (newframe: any) => {
      setTimeout(() => {
        const frame: Frame = JSON.parse(newframe.data);
        this.frameTime = frame.time!;
        const readings = frame.readings[0];
        // check if the patient stepped off the mat
        const sum = readings.reduce((previous: any, current: any) => previous + current, 0);
        if (sum === 0 && !this.viewingResults) {
          console.log(this.centersOfPressure, 'cop');

          this.centersOfPressure.clear();
        }
        this.frames.push(frame);
      }, this.delayTime);
    });
  }
  private setSensor(sensor: Sensor): void {
    this.sensor = new Sensor(sensor.columns, sensor.rows, sensor.minimum, sensor.maximum, sensor.height, sensor.width, sensor.units);
    this.hmGraph = new Graph(this.canvas!, this.ctx!, { aspect: sensor.rows / sensor.columns, background: '#424242' });
    this.hmGraph.setMargin(
      0,
      new VAxis(this.canvas!, this.ctx!, {
        color: 'black',
        maximum: 1,
        minimum: sensor.columns,
        ticks: sensor.columns,
        width: 30,
        align: 'right'
      })
    );
    this.hmGraph.setMargin(
      1,
      new HAxis(this.canvas!, this.ctx!, {
        color: 'black',
        minimum: 1,
        maximum: sensor.rows,
        ticks: sensor.rows,
        height: 30,
        align: 'bottom'
      })
    );
    this.hmGraph.setMargin(2, 20);
    this.hmGraph.setMargin(3, 20);
    this.grid = new Grid(this.canvas!, this.ctx!, {
      columns: sensor.rows,
      rows: sensor.columns,
      color: '#424242'
    });
    this.hmGraph.addPlot(this.grid);
    const quadrants = new Quadrants(this.canvas!, this.ctx!, {
      columns: sensor.rows,
      rows: sensor.columns
    });
    this.hmGraph.addPlot(quadrants);

    this.heatmap = new Heatmap(this.canvas!, this.ctx!, {
      columns: sensor.rows,
      rows: sensor.columns,
      maximum: sensor.maximum
    });
    this.hmGraph.addPlot(this.heatmap);

    this.numericValues = new NumericValues(this.canvas!, this.ctx!, {
      columns: sensor.rows,
      rows: sensor.columns
    });
    this.hmGraph.addPlot(this.numericValues);
    console.log(this.numericValues, 'nm');

    this.sizer.setItem(0, 0, this.hmGraph);
    this.resize();
    this.animate();
  }
  private waitForFinalEvent(callback: () => void, ms: number, eventId: any): void {
    console.log(this.timers, 'timer');

    if (this.timers[eventId]) {
      clearTimeout(this.timers[eventId]);
    }
    // this.timers[eventId] = setTimeout(callback, ms);
  }
  @HostListener('window:resize', ['$event'])
  resize(): void {
    if (!this.canvas) {
      alert('No canvas yet');
      return;
    }
    this.canvas.style.width = '0';
    this.canvas.style.height = '0';
    this.canvas.width = 0;
    this.canvas.height = 0;
    const calculatedHeight = (window.screen.height / 2.3) * (this.sensor.columns / this.sensor.rows);
    this.waitForFinalEvent(
      () => {
        this.canvas!.style.width = '100%';
        this.canvas!.style.height = '100%';
        this.canvas!.width = this.canvas!.offsetWidth;
        this.canvas!.height = calculatedHeight < 250 ? 250 : calculatedHeight; //this.canvas!.offsetHeight;
        if (this.sizer) this.sizer.setRect(0, 0, this.canvas!.width, this.canvas!.height);
      },
      200,
      'Resize'
    );
  }
  animate(): void {
    this.animateTimer = setTimeout(() => {
      console.log(this.animateTimer, 'at');

      const frameCount = this.frames.getLength();
      if (frameCount > 0) {
        let frame = this.frames.get(0);
        this.ctx!.fillStyle = '#222';
        this.ctx!.fillRect(0, 0, this.canvas!.width, this.canvas!.height);
        const rawReadings = frame.readings[0];
        const translatedReadings = this.sensor.rotateReadings(rawReadings);
        if (this.heatmap) {
          this.heatmap.setValues(translatedReadings);
        }
        if (this.numericValues) {
          this.numericValues.setValues(translatedReadings);
          console.log(this.numericValues, 'nm');
        }
        if (frameCount > 2) {
          const ms1 = Date.parse(frame.time!);
          frame = this.frames.get(2 - frameCount);
          const ms0 = Date.parse(frame.time!);
          if (ms1 > ms0) {
            const fps = Math.round((1000 * (frameCount - 2)) / (ms1 - ms0));
            this.frameRate = fps + ' fps';
          }
        }

        this.hmGraph?.draw();
        this.trackCenterOfPressure();
        if (this.showBoundingBox) {
          this.onSetBoundingBox();
        }
        // this.drawLabels();
        const footTypeCalculation = this.footTypeCalculator.calculateBoth(this.sensor, rawReadings);
        this.leftForePressure = footTypeCalculation.leftFrontPressure;
        this.leftRearPressure = footTypeCalculation.leftRearPressure;
        this.rightForePressure = footTypeCalculation.rightFrontPressure;
        this.rightRearPressure = footTypeCalculation.rightRearPressure;
      }
      if (!this.viewingResults) {
        this.animation = requestAnimationFrame(() => this.animate());
      }
    }, 100); // refresh display at 10Hz
  }
  private trackCenterOfPressure(): void {
    const centerOfPressure = CenterOfPressure.calculate(this.frames.get(0).readings[0], this.sensor);
    if (centerOfPressure && centerOfPressure.x && centerOfPressure.y) {
      this.centersOfPressure.push(centerOfPressure);
      console.log(this.centersOfPressure, 'cop');

      // transpose the columns/rows from the sensor
      const columns = this.sensor.rows;
      const rows = this.sensor.columns;

      // get the size, in pixels, of the rows and columns
      const columnWidth = this.grid!.width / columns;
      const rowHeight = this.grid!.height / rows;

      this.ctx!.save();
      const centers = this.centersOfPressure.snapshot();
      console.log(this.centersOfPressure, 'cop');

      this.ctx!.strokeStyle = '#FFFFFF';
      this.ctx!.lineWidth = 1;
      let firstItem = true;
      centers.forEach((value: { x: number; y: number; }) => {
        if (firstItem) {
          this.ctx!.moveTo(this.grid!.left + value.x * columnWidth, this.grid!.top + value.y * rowHeight);
          firstItem = false;
        } else {
          this.ctx!.lineTo(this.grid!.left + value.x * columnWidth, this.grid!.top + value.y * rowHeight);
          this.ctx!.stroke();
        }
      });
      this.ctx!.save();
      this.ctx!.fillStyle = '#0000FF'; // Blue color
      const centerX = this.grid!.left + centerOfPressure.x * columnWidth;
      const centerY = this.grid!.top + centerOfPressure.y * rowHeight;
      const circleRadius = 3; // Adjust the circle radius as needed
      this.ctx!.beginPath();
      this.ctx!.arc(centerX, centerY, circleRadius, 0, Math.PI * 2);
      this.ctx!.fill();
      this.ctx!.restore();
    }
    this.calculateMaxSwingSway();
    console.log('Maximum Swing Sway (X): ' + this.maxSwingSwayX);
    console.log('Maximum Swing Sway (Y): ' + this.maxSwingSwayY);
    this.totalSway = this.maxSwingSwayX + this.maxSwingSwayY;
    console.log(this.totalSway, 'kaam ki sway');
  }
  private drawLabels(): void {
    this.ctx!.save();
    this.ctx!.fillStyle = '#C8C8C8';
    this.ctx!.font =
      'bold 24pt "Ubuntu", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, HelveticaNeue-CondensedBold, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';
    this.ctx!.textAlign = 'center';
    this.ctx!.fillText('FRONT', this.grid!.left + this.grid!.width / 2, 160);
    this.ctx!.restore();
  }
  onSetBoundingBox(): void {
    const frame = this.frames.get(0);
    if (frame) {
      // get the readings and transpose into a horizontal x/y system
      let readings: number[] = frame.readings[0];
      readings = this.sensor.rotateReadings(readings);
      console.log(frame, frames, this.frameRate, this.frameTime, frameElement, FrameSection, 'saari ki saari frame');

      // transpose the columns/rows from the sensor
      const columns = this.sensor.rows;
      const rows = this.sensor.columns;

      // set everything to their opposite boundaries
      let minX = columns;
      let maxX = 0;
      let minY = rows;
      let maxY = 0;

      // assign the min and max x/y based on the data
      readings.forEach((value, index) => {
        if (value !== 0) {
          const coordinates = this.sensor.coordinatesFor(index);
          if (!minX || coordinates.x < minX) {
            minX = coordinates.x;
          }
          if (!maxX || coordinates.x > maxX) {
            maxX = coordinates.x;
          }
          if (!minY || coordinates.y < minY) {
            minY = coordinates.y;
          }
          if (!maxY || coordinates.y > maxY) {
            maxY = coordinates.y;
          }
        }
      });

      // shift the min/max for a little buffer
      if (minX) {
        minX -= 0.5;
      }

      if (maxX) {
        maxX += 1.5;
      }

      if (minY) {
        minY -= 0.5;
      }

      if (maxY) {
        maxY += 1.0;
      }

      // store some values in the component, for debugging
      this.minX = minX;
      this.maxX = maxX;
      this.minY = minY;
      this.maxY = maxY;

      if (maxX) {
        // find the left-right, top-bottom dividing lines
        this.middleY = minY + (maxY - minY) / 2.0;
        console.log(this.middleY, this.middleX, 'show debug');

        this.middleX = minX + (maxX - minX + 1) / 2.0;

        // set the x boundaries of the feet to their extreme possible values
        let leftMaxX = minX;
        let rightMinX = maxX;

        // loop through the values, using the middle point to distinguish left-right
        readings.forEach((value, index) => {
          if (value !== 0) {
            const coordinates = this.sensor.coordinatesFor(index);
            if (coordinates.x > leftMaxX && coordinates.x <= this.middleX) {
              leftMaxX = coordinates.x;
            }
            if (coordinates.x < rightMinX && coordinates.x >= this.middleX) {
              rightMinX = coordinates.x;
            }
          }
        });

        // shift the boundaries to include a buffer
        leftMaxX += 1.5;
        rightMinX -= 0.5;

        // find the middle of each foot
        const leftMiddle = minX + (leftMaxX - minX) / 2.0;
        const rightMiddle = rightMinX + (maxX - rightMinX) / 2.0;

        // foot sections, assumes feet are evenly placed, and of equal size
        const footHeight = maxY - minY;
        const sectionHeight = footHeight / 3.0;
        const topRowThreshold = minY + sectionHeight;
        const middleRowThreshold = minY + sectionHeight * 2;

        // create structures to hold the boundaries of each foot
        this.leftFoot = new FrameSection([minX, minY], [leftMaxX, maxY]);
        this.rightFoot = new FrameSection([rightMinX, minY], [maxX, maxY]);

        // get the size, in pixels, of the rows and columns
        const columnWidth = this.grid!.width / columns;
        const rowHeight = this.grid!.height / rows;

        this.ctx?.save();
        this.ctx!.lineWidth = 3;
        this.ctx!.strokeStyle = '#424242';
        this.ctx?.strokeRect(
          this.grid!.left + minX * columnWidth,
          this.grid!.top + minY * rowHeight,
          (maxX - minX) * columnWidth, //stride length

          (maxY - minY) * rowHeight
        );
        this.strideLength = (maxX - minX) * columnWidth;
        this.stridelength.setStrideLength(this.strideLength);
        console.log(this.maxY, this.maxX, this.minX, this.minY, 'show Debug');

        // sessionStorage.setItem('strideLength',this.strideLength)

        this.ctx!.strokeStyle = '#424242';
        this.ctx!.beginPath();
        this.ctx!.moveTo(this.grid!.left + leftMiddle * columnWidth, this.grid!.top + minY * rowHeight);
        this.ctx!.lineTo(this.grid!.left + leftMiddle * columnWidth, this.grid!.top + maxY * rowHeight);
        this.ctx!.stroke();
        console.log(this.maxY, this.maxX, this.minX, this.minY, 'show Debug');

        this.ctx!.strokeStyle = '#424242';
        this.ctx!.beginPath();
        this.ctx!.moveTo(this.grid!.left + rightMiddle * columnWidth, this.grid!.top + minY * rowHeight);
        this.ctx!.lineTo(this.grid!.left + rightMiddle * columnWidth, this.grid!.top + maxY * rowHeight);
        this.ctx!.stroke();
        console.log(this.maxY, this.maxX, this.minX, this.minY, 'show Debug');

        this.ctx!.strokeStyle = '#424242';
        this.ctx!.beginPath();
        this.ctx!.setLineDash([5, 15]);
        this.ctx!.moveTo(this.grid!.left + minX * columnWidth, this.grid!.top + topRowThreshold * rowHeight);
        this.ctx!.lineTo(this.grid!.left + maxX * columnWidth, this.grid!.top + topRowThreshold * rowHeight);
        this.ctx!.stroke();
        this.ctx!.setLineDash([]);
        console.log(this.maxY, this.maxX, this.minX, this.minY, 'show Debug');

        this.ctx!.beginPath();
        this.ctx!.setLineDash([5, 15]);
        this.ctx!.moveTo(this.grid!.left + minX * columnWidth, this.grid!.top + middleRowThreshold * rowHeight);
        this.ctx!.lineTo(this.grid!.left + maxX * columnWidth, this.grid!.top + middleRowThreshold * rowHeight);
        this.ctx!.stroke();
        this.ctx!.setLineDash([]);
        console.log(this.maxY, this.maxX, this.minX, this.minY, 'show Debug');

        this.ctx!.strokeStyle = '#424242';
        this.ctx?.strokeRect(
          this.grid!.left + this.leftFoot.minX * columnWidth,
          this.grid!.top + this.leftFoot.minY * rowHeight,
          this.leftFoot.width() * columnWidth,
          this.leftFoot.height() * rowHeight
        );
        console.log(this.maxY, this.maxX, this.minX, this.minY, 'show Debug');

        this.ctx?.strokeRect(
          this.grid!.left + this.rightFoot.minX * columnWidth,
          this.grid!.top + this.rightFoot.minY * rowHeight,
          this.rightFoot.width() * columnWidth,
          this.rightFoot.height() * rowHeight
        );
        console.log(this.maxY, this.maxX, this.minX, this.minY, 'show Debug');

        this.ctx?.restore();
      }
    }
  }
  resetSensor(): void {
    this.setSensor(this.sensor);
  }
  calculateMaxSwingSway(): void {
    // Iterate through the centersOfPressure data
    for (const centerOfPressure of this.centersOfPressure.snapshot()) {
      const x = centerOfPressure.x;
      const y = centerOfPressure.y;
      console.log(x, y, 'show Debug');

      // Update the minimum and maximum x and y coordinates
      this.minX = Math.min(this.minX, x);
      this.maxX = Math.max(this.maxX, x);
      this.minY = Math.min(this.minY, y);
      this.maxY = Math.max(this.maxY, y);
      console.log(this.maxY, this.maxX, this.minX, this.minY, 'show Debug');
    }

    // Calculate the maximum sway in the x and y directions
    this.maxSwingSwayX = this.maxX - this.minX;
    this.maxSwingSwayY = this.maxY - this.minY;
    console.log(this.maxY, this.maxX, this.minX, this.minY, 'show Debug');
  }
  // calculateMaxSwingVelocity(): number {
  //   let maxSwingVelocity = 0;
  //   let previousCenterOfPressure: CenterOfPressure | undefined = undefined;

  //   for (const centerOfPressure of this.centersOfPressure.snapshot()) {
  //     if (previousCenterOfPressure) {
  //       const deltaX = centerOfPressure.x - previousCenterOfPressure.x;
  //       const deltaY = centerOfPressure.y - previousCenterOfPressure.y;
  //       const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

  //       const currentTimestamp = Date.parse(centerOfPressure.timestamp);
  //       const previousTimestamp = Date.parse(previousCenterOfPressure.timestamp);
  //       const timeElapsed = (currentTimestamp - previousTimestamp) / 1000; // Convert to seconds

  //       const velocity = distance / timeElapsed;

  //       if (velocity > maxSwingVelocity) {
  //         maxSwingVelocity = velocity;
  //       }
  //     }

  //     previousCenterOfPressure = centerOfPressure;
  //   }

  //   return maxSwingVelocity;
  // }

  // onBeginTest(): void {
  //   this.viewingResults = false;
  //   console.log(this.centersOfPressure, 'cop');
  //   this.calculateMaxSwingSway();
  //   console.log('Maximum Swing Sway (X): ' + this.maxSwingSwayX);
  //   console.log('Maximum Swing Sway (Y): ' + this.maxSwingSwayY);
  //   this.totalSway = this.maxSwingSwayX + this.maxSwingSwayY;
  //   console.log(this.totalSway, 'kaam ki sway');

  //   this.centersOfPressure.clear();
  //   this.animate();
  //   this.testInProgress = true;
  //   this.testComplete = false;
  //   this.testDurationProgress = 0;
  //   this.testInterval = setInterval(() => {
  //     this.testDurationProgress++;
  //     if (this.testDurationProgress >= this.testDuration) {
  //       clearInterval(this.testInterval);
  //       this.viewingResults = true;
  //       // For current demo purposes, use the last visible measurement to calculate foot type
  //       // const testFrames = this.frames.snapshot();
  //       // const allReadings: number[][] = [];
  //       // testFrames.forEach(frame => {
  //       //   allReadings.push(frame.readings[0]);
  //       // });
  //       // const sums = allReadings[0].map((_, i) => allReadings.reduce((p, r, j) => p + allReadings[j][i], 0));
  //       // const averageReading = sums.map(v => v / allReadings.length);
  //       // this.testManagementService.aggregateRecording = averageReading;
  //       const calculatedFootTypes = this.footTypeCalculator.calculateBoth(this.sensor, this.frames.get(0).readings[0]);
  //       this.testManagementService.calculatedFootTypes = calculatedFootTypes;
  //       this.leftFootType = calculatedFootTypes.leftFoot;
  //       this.rightFootType = calculatedFootTypes.rightFoot;
  //       this.leftForePressure = calculatedFootTypes.leftFrontPressure;
  //       this.leftRearPressure = calculatedFootTypes.leftRearPressure;
  //       this.rightForePressure = calculatedFootTypes.rightFrontPressure;
  //       this.rightRearPressure = calculatedFootTypes.rightRearPressure;
  //       this.testManagementService.recordedCentersOfPressure = this.centersOfPressure.snapshot();
  //       console.log(this.centersOfPressure, 'cop');

  //       this.swayLength = 0;
  //       let previousCenterOfPressure: CenterOfPressure | undefined = undefined;
  //       this.testManagementService.recordedCentersOfPressure.forEach((value: { x: number; y: number; }) => {
  //         if (previousCenterOfPressure) {
  //           this.swayLength += Math.hypot(value.x - previousCenterOfPressure.x, value.y - previousCenterOfPressure.y);
  //         }
  //         previousCenterOfPressure = value;
  //       });
  //       // convert to centimeters
  //       this.swayLength *= this.sensor.cellWidth;
  //       const roundedSwayLength = Math.round(this.swayLength);
  //       if (this.selectedObservation?.category === ObservationCategory.BALANCE) {
  //         this.testManagementService.balanceLengthsOfPaths[this.current++] = roundedSwayLength;
  //       } else {
  //         this.testManagementService.balanceLengthsOfPaths[0] = roundedSwayLength;
  //       }
  //       console.log(roundedSwayLength, this.swayLength, 'show Debug');

  //       const canvasImageData = this.canvas?.toDataURL();
  //       if (canvasImageData) {
  //         const imageData = this.imageDataService.fromBase64String(canvasImageData);
  //         this.testManagementService.currentImage = imageData;
  //       }
  //       const saveAssessment = this.testManagementService.saveAssessment();
  //       if (saveAssessment) {
  //         if (this.saveAssessmentSubscription) {
  //           this.saveAssessmentSubscription.unsubscribe();
  //         }
  //         this.saveAssessmentSubscription = saveAssessment.subscribe((value: { body: any; }) => {
  //           const assessment = value.body;
  //           if (assessment) {
  //             if (this.testManagementService.currentAssessment) {
  //               this.testManagementService.currentAssessment.id = assessment.id;
  //               if (assessment.standardPercentile || assessment.standardPercentile === 0) {
  //                 this.testManagementService.currentAssessment.standardPercentile = assessment.standardPercentile;
  //                 this.testManagementService.standardPercentile = assessment.standardPercentile;
  //               }
  //               if (assessment.proPercentile || assessment.proPercentile === 0) {
  //                 this.testManagementService.currentAssessment.proPercentile = assessment.proPercentile;
  //                 this.testManagementService.proPercentile = assessment.proPercentile;
  //               }
  //               if (assessment.visionPercentile || assessment.visionPercentile === 0) {
  //                 this.testManagementService.currentAssessment.visionPercentile = assessment.visionPercentile;
  //                 this.testManagementService.visionPercentile = assessment.visionPercentile;
  //               }
  //               if (assessment.vestibularPercentile || assessment.vestibularPercentile === 0) {
  //                 this.testManagementService.currentAssessment.vestibularPercentile = assessment.vestibularPercentile;
  //                 this.testManagementService.vestibularPercentile = assessment.vestibularPercentile;
  //               }
  //             }
  //           }
  //           this.testComplete = true;
  //           this.testInProgress = false;
  //         });
  //       } else {
  //         this.alertService.error('error.notenoughdata');
  //         this.testComplete = true;
  //         this.testInProgress = false;
  //       }
  //     }
  //   }, 1000);
  // }
}
