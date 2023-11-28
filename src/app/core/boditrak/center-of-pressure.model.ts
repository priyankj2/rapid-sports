import { FrameSection } from 'app/core/boditrak/frame-section.model';
import { Sensor } from 'app/core/boditrak/sensor.model';

export class CenterOfPressure {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public static calculate(readings: number[], sensor: Sensor, section?: FrameSection): CenterOfPressure {
    const rotatedReadings = sensor.rotateReadings(readings);
    let centerOfPressure = { x: 0, y: 0 };
    let xTotalPressure = 0;
    let yTotalPressure = 0;
    let totalPressure = 0;
    rotatedReadings.forEach((pressure, index) => {
      if (pressure) {
        const coordinates = sensor.coordinatesFor(index);
        if (!section || section.contains(coordinates.x, coordinates.y)) {
          xTotalPressure += pressure * coordinates.x;
          yTotalPressure += pressure * coordinates.y;
          totalPressure += pressure;
        }
      }
    });

    if (totalPressure) {
      const x = xTotalPressure / totalPressure;
      const y = yTotalPressure / totalPressure;
      centerOfPressure = new CenterOfPressure(x, y);
    }

    return centerOfPressure;
  }
}
