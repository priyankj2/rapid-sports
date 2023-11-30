import { BoundingBox } from "./bounding-box.model";
import { ColorSet } from "./color-set.model";


export class Heatmap extends BoundingBox {
  [x: string]: any;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  colorset = new ColorSet(0);
  columns = 0;
  rows = 0;
  values: number[] = [];
  minimum = 0;
  maximum = 100;

  constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, options: any) {
    super();
    this.canvas = canvas;
    this.ctx = context;
    if (options) {
      const paletteId = options.palette ?? 0;
      this.colorset = new ColorSet(paletteId);
      this.columns = options.columns ?? 0;
      this.rows = options.rows ?? 0;
      this.minimum = options.minimum ?? 0;
      this.maximum = options.maximum ?? 100;
    }
  }

  setValues(values: number[]): void {
    this.values = values;
  }

  override draw(): void {
    if (!this.columns || !this.rows || this.values.length < this.columns * this.rows) return;

    const values2 = this.interpolateGrid(this.values, this.columns, this.rows);
    const values3 = this.interpolateGrid(values2, 2 * this.columns + 1, 2 * this.rows + 1);
    const values4 = this.interpolateGrid(values3, 2 * (2 * this.columns + 1) + 1, 2 * (2 * this.rows + 1) + 1);
    const canvas2 = document.createElement('canvas');
    canvas2.width = 2 * (2 * (2 * this.columns + 1) + 1) + 1;
    canvas2.height = 2 * (2 * (2 * this.rows + 1) + 1) + 1;
    const ctx2 = canvas2.getContext('2d');
    const pixels = this.ctx.getImageData(0, 0, canvas2.width, canvas2.height);
    let i = 0;
    const maximumValue = Math.max(...this.values);
    const range = maximumValue - this.minimum;
    for (let r = 0; r < canvas2.height; ++r)
      for (let c = 0; c < canvas2.width; ++c, ++i) {
        pixels.data[4 * i + 0] = this.colorset.getRed((values4[i] - this.minimum) / range);
        pixels.data[4 * i + 1] = this.colorset.getGreen((values4[i] - this.minimum) / range);
        pixels.data[4 * i + 2] = this.colorset.getBlue((values4[i] - this.minimum) / range);
        pixels.data[4 * i + 3] = values4[i] < 0 ? 0 : values4[i] < 5 ? 50 * values4[i] : 255;
      }
    ctx2!.putImageData(pixels, 0, 0);
    this.ctx.drawImage(canvas2, 0, 0, canvas2.width, canvas2.height, this.left, this.top, this.width, this.height);
  }

  setRange(minimum: number, maximum: number): void {
    this.minimum = minimum;
    this.maximum = maximum;
  }

  extrapolate(v1: number, v2: number): number {
    return v1 + (v1 - v2) / 2;
  }

  interpolate3(v1: number, v2: number, v3: number): number {
    const a = v2 + (v2 - v3) / 2;
    const b = (v1 + v2) / 2;
    return (a + b) / 2;
  }

  interpolate4(v1: number, v2: number, v3: number, v4: number): number {
    const a = v2 + (v2 - v1) / 2;
    const b = v3 + (v3 - v4) / 2;
    const c = (v2 + v3) / 2;
    return (a + b + 2 * c) / 4;
  }

  interpolateGrid(values: number[], columns: number, rows: number): number[] {
    const newValues = [];
    const newColumns = 2 * columns + 1;
    let i = 0; // index into original values
    let j = 0; // index into new values
    for (j = 0; j < newColumns; ++j) {
      newValues[j] = 0;
    }

    for (let r = 0; r < rows; ++r) {
      newValues[j++] = this.extrapolate(values[i], values[i + 1]);
      newValues[j++] = values[i];
      newValues[j++] = this.interpolate3(values[i], values[i + 1], values[i + 2]);
      i++;
      for (let c = 1; c < columns - 2; ++c, ++i) {
        newValues[j++] = values[i];
        newValues[j++] = this.interpolate4(values[i - 1], values[i], values[i + 1], values[i + 2]);
      }
      newValues[j++] = values[i];
      newValues[j++] = this.interpolate3(values[i + 1], values[i], values[i - 1]);
      i++;
      newValues[j++] = values[i];
      newValues[j++] = this.extrapolate(values[i], values[i - 1]);
      i++;
      for (let c = 0; c < newColumns; ++c, ++j) newValues[j] = newValues[j - newColumns];
    }

    for (j = 0; j < newColumns; ++j) newValues[j] = this.extrapolate(newValues[newColumns + j], newValues[3 * newColumns + j]);
    j += newColumns;
    for (let c = 0; c < newColumns; ++c, ++j)
      newValues[j] = this.interpolate3(newValues[j - newColumns], newValues[j + newColumns], newValues[j + 3 * newColumns]);
    j += newColumns;
    for (let r = 1; r < rows - 2; ++r) {
      for (let c = 0; c < newColumns; ++c, ++j)
        newValues[j] = this.interpolate4(
          newValues[j - 3 * newColumns],
          newValues[j - newColumns],
          newValues[j + newColumns],
          newValues[j + 3 * newColumns]
        );
      j += newColumns;
    }
    for (let c = 0; c < newColumns; ++c, ++j)
      newValues[j] = this.interpolate3(newValues[j + newColumns], newValues[j - newColumns], newValues[j - 3 * newColumns]);
    j += newColumns;
    for (let c = 0; c < newColumns; ++c, ++j) newValues[j] = this.extrapolate(newValues[j - newColumns], newValues[j - 3 * newColumns]);
    return newValues;
  }
}
