import { Injectable, OnDestroy } from '@angular/core';
import { Sensor } from '../core/boditrak/sensor.model';
import { PeakPressureData } from '../core/foot-type/peak-pressure-data.model';
import { FootTypeService } from '../entities/foot-type/foot-type.service';
import { IFootType } from '../shared/model/foot-type.model';
import { Subscription } from 'rxjs';
import { FootTestResult } from '../shared/model/foot-test-result.model';

@Injectable({
  providedIn: 'root'
})
export class FootTypeCalculatorService implements OnDestroy {
  static readonly LEFT_FOOT = 'left';
  static readonly RIGHT_FOOT = 'right';

  allFootTypes: IFootType[] = [];
  unrecognizedFootType?: IFootType;
  private readonly footTypeSubscription?: Subscription;

  constructor(private footTypeService: FootTypeService) {
    this.footTypeSubscription = this.footTypeService.query().subscribe(value => {
      if (value.body) {
        this.allFootTypes = value.body;
        this.unrecognizedFootType = this.allFootTypes.find(footType => {
          return footType.id === -1;
        });
      }
    });
  }

  calculateBoth(sensor: Sensor, rawReading: number[]): FootTestResult {
    const left = this.calculate(sensor, rawReading, FootTypeCalculatorService.LEFT_FOOT);
    const right = this.calculate(sensor, rawReading, FootTypeCalculatorService.RIGHT_FOOT);
    return new FootTestResult(
      left.footType,
      right.footType,
      left.data.forePressure,
      left.data.rearPressure,
      right.data.forePressure,
      right.data.rearPressure
    );
  }

  calculate(sensor: Sensor, rawReading: number[], foot: string): { footType: IFootType | undefined; data: PeakPressureData } {
    const peakPressureData = this.calculatePeakPressure(sensor, rawReading, foot);
    let footType = this.unrecognizedFootType;
    if (this.allFootTypes) {
      const calculatedFootType = this.allFootTypes.find(f => {
        return (
          f.forefootLateral === peakPressureData.forefootLateral &&
          f.forefootMedial === peakPressureData.forefootMedial &&
          f.midfootLateral === peakPressureData.midfootLateral &&
          f.midfootMedial === peakPressureData.midfootMedial &&
          f.rearfootLateral === peakPressureData.rearfootLateral &&
          f.rearfootMedial === peakPressureData.rearfootMedial
        );
      });
      if (calculatedFootType) {
        footType = calculatedFootType;
      }
    }
    return { footType, data: peakPressureData };
  }

  calculatePeakPressure(sensor: Sensor, rawReading: number[], foot: string): PeakPressureData {
    const readings = sensor.rotateReadings(rawReading);

    // transpose the columns/rows from the sensor
    const columns = sensor.rows;
    const rows = sensor.columns;

    // set everything to their opposite boundaries
    let minX = columns;
    let maxX = 0;
    let minY = rows;
    let maxY = 0;

    readings.forEach((value, index) => {
      if (value !== 0) {
        const coordinates = sensor.coordinatesFor(index);
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

    // find the left-right dividing line
    const middleX = minX + (maxX - minX + 1) / 2.0;

    // set the x boundaries of the feet to their extreme possible values
    let leftMaxX = minX;
    let rightMinX = maxX;

    // loop through the values, using the middle point to distinguish left-right
    readings.forEach((value, index) => {
      if (value !== 0) {
        const coordinates = sensor.coordinatesFor(index);
        if (coordinates.x > leftMaxX && coordinates.x <= middleX) {
          leftMaxX = coordinates.x;
        }
        if (coordinates.x < rightMinX && coordinates.x >= middleX) {
          rightMinX = coordinates.x;
        }
      }
    });

    // find the middle of each foot
    const leftMiddle = minX + (leftMaxX - minX) / 2.0;
    const rightMiddle = rightMinX + (maxX - rightMinX) / 2.0;

    // reduce all the values until the max is 1;
    let leftPeak = Math.max(...readings);
    let rightPeak = Math.max(...readings);
    let leftValues = readings.slice();
    let rightValues = readings.slice();

    // get the fore-to-rear sections
    const footHeight = maxY - minY;
    const sectionHeight = footHeight / 3.0;
    const topRowThreshold = Math.ceil(minY + sectionHeight);
    const middleRowThreshold = Math.ceil(minY + sectionHeight * 2);
    const middleY = minY + footHeight / 2;

    // unique to the service:
    // finding the peak pressure
    while (leftPeak > 1) {
      leftValues = leftValues.map((x, index) => {
        if (x === 0) {
          return x;
        }
        const coordinates = sensor.coordinatesFor(index);
        if (coordinates.x < middleX) {
          return x - 1;
        }
        return 0;
      });
      leftPeak = Math.max(...leftValues);
    }

    while (rightPeak > 1) {
      rightValues = rightValues.map((x, index) => {
        if (x === 0) {
          return x;
        }
        const coordinates = sensor.coordinatesFor(index);
        if (coordinates.x > middleX) {
          return x - 1;
        }
        return 0;
      });
      rightPeak = Math.max(...rightValues);
    }

    let leftForePressure = 0;
    let leftRearPressure = 0;
    let rightForePressure = 0;
    let rightRearPressure = 0;
    readings.forEach((value, index) => {
      const coordinates = sensor.coordinatesFor(index);
      if (coordinates.x < middleX) {
        if (coordinates.y < middleY) {
          leftForePressure += value;
        } else {
          leftRearPressure += value;
        }
      } else {
        if (coordinates.y < middleY) {
          rightForePressure += value;
        } else {
          rightRearPressure += value;
        }
      }
    });

    const data = new PeakPressureData();
    if (FootTypeCalculatorService.LEFT_FOOT === foot) {
      data.forePressure = leftForePressure;
      data.rearPressure = leftRearPressure;
      leftValues.forEach((value, index) => {
        if (value > 0) {
          const coordinates = sensor.coordinatesFor(index);
          if (coordinates.y <= topRowThreshold) {
            // forefoot
            if (coordinates.x > leftMiddle) {
              data.forefootMedial = 1;
            } else {
              data.forefootLateral = 1;
            }
          } else if (coordinates.y < middleRowThreshold) {
            // midfoot
            if (coordinates.x > leftMiddle) {
              data.midfootMedial = 1;
            } else {
              data.midfootLateral = 1;
            }
          } else {
            // rearfoot
            if (coordinates.x > leftMiddle) {
              data.rearfootMedial = 1;
            } else {
              data.rearfootLateral = 1;
            }
          }
        }
      });
    } else {
      data.forePressure = rightForePressure;
      data.rearPressure = rightRearPressure;
      rightValues.forEach((value, index) => {
        if (value > 0) {
          const coordinates = sensor.coordinatesFor(index);
          if (coordinates.y < topRowThreshold) {
            // forefoot
            if (coordinates.x < rightMiddle) {
              data.forefootMedial = 1;
            } else {
              data.forefootLateral = 1;
            }
          } else if (coordinates.y < middleRowThreshold) {
            // midfoot
            if (coordinates.x < rightMiddle) {
              data.midfootMedial = 1;
            } else {
              data.midfootLateral = 1;
            }
          } else {
            // rearfoot
            if (coordinates.x < rightMiddle) {
              data.rearfootMedial = 1;
            } else {
              data.rearfootLateral = 1;
            }
          }
        }
      });
    }
    return data;
  }

  ngOnDestroy(): void {
    if (this.footTypeSubscription) {
      this.footTypeSubscription.unsubscribe();
    }
  }
}
