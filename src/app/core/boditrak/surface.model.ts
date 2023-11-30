import { BoundingBox } from "./bounding-box.model";
import { ColorSet } from "./color-set.model";
import { Point } from "./point.model";


export class Surface extends BoundingBox {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  colorSet = new ColorSet(0);
  private background: string;
  private color: string;
  private columns: number;
  private rows: number;
  private minimum: number;
  private maximum: number;
  private rmX: number[];
  private rmY: number[];
  private rmZ: number[];
  private focalLength: number;
  private zoom: number;
  private values: number[];
  private scale = 1;

  constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, options: any) {
    super();
    this.canvas = canvas;
    this.ctx = context;
    this.left = 0;
    this.top = 0;
    this.width = options ? options.width : 0;
    this.height = options ? options.height : 20;
    if (!options) {
      options = {};
    }
    this.background = options.background ?? 'silver';
    this.color = options.background ?? 'black';
    const paletteId = options.palette ?? 0;
    this.colorSet = new ColorSet(paletteId);
    this.columns = options.columns ?? 16;
    this.rows = options.rows ?? 16;
    this.minimum = options.minimum ?? 0;
    this.maximum = options.maximum ?? 100;
    let a = options.tilt ? (options.tilt * Math.PI) / 180 : Math.PI / 4;
    this.rmX = [1, 0, 0, 0, Math.cos(a), -Math.sin(a), 0, Math.sin(a), Math.cos(a)];
    a = 0;
    this.rmY = [Math.cos(a), 0, Math.sin(a), 0, 1, 0, -Math.sin(a), 0, Math.cos(a)];
    a = options.rotation ? (options.rotation * Math.PI) / 180 : Math.PI / 4;
    this.rmZ = [Math.cos(a), -Math.sin(a), 0, Math.sin(a), Math.cos(a), 0, 0, 0, 1];
    this.focalLength = options.focalLength ?? 0.3;
    this.zoom = options.zoom ?? 1;
    this.values = [];
    for (let r = 0; r < this.rows; ++r) {
      for (let c = 0; c < this.columns; ++c) {
        this.values.push(0);
      }
    }
  }

  override draw(): void {
    this.ctx.fillStyle = this.background;
    this.ctx.fillRect(this.left, this.top, this.width, this.height);
    if (this.values.length < this.columns * this.rows) return;

    const dxy = Math.sqrt(this.columns * this.columns + this.rows * this.rows);
    const dz = 4 * (this.maximum - this.minimum);
    const points: Point[] = [];
    let i = 0;
    const cx = this.columns / 2 - 0.5;
    const cy = this.rows / 2 - 0.5;
    for (let r = 0; r < this.rows; ++r) {
      for (let c = 0; c < this.columns; ++c, ++i) {
        const world = {
          x: (c - cx) / dxy,
          y: (r - cy) / dxy,
          z: (this.values[i] - this.minimum) / dz
        };
        const view = this.rotateZ(world);
        points[i] = this.rotateX(view);
        points[i].color = this.colorSet.getColor(this.values[i]);
      }
    }

    this.ctx.save();
    this.ctx.translate(this.left + this.width / 2, this.top + this.height / 2); // Translate the surface's origin to the center of the canvas.
    this.ctx.beginPath();
    i = 0;
    for (let r = 0; r < this.rows; ++r) {
      for (let c = 0; c < this.columns; ++c, ++i) {
        const s = (this.zoom * 2 * this.focalLength * this.width) / (1 - points[i].z);
        const x = points[i].x * s;
        const y = points[i].y * s;
        if (c === 0) {
          this.ctx.moveTo(x, y);
        } else {
          this.ctx.lineTo(x, y);
        }
      }
    }
    for (let c = 0; c < this.columns; ++c) {
      i = c;
      for (let r = 0; r < this.rows; ++r, i += this.columns) {
        const s = (this.zoom * 2 * this.focalLength * this.width) / (1 - points[i].z);
        const x = points[i].x * s;
        const y = points[i].y * s;
        if (r === 0) {
          this.ctx.moveTo(x, y);
        } else {
          this.ctx.lineTo(x, y);
        }
      }
    }
    this.ctx.strokeStyle = this.color;
    this.ctx.stroke();
    this.ctx.restore();
  }

  setValues(values: number[]): void {
    this.values = values;
  }

  setRange(minimum: number, maximum: number): void {
    this.minimum = minimum;
    this.maximum = maximum;
  }

  setTilt(angle: number): void {
    this.rmX[4] = Math.cos(angle);
    this.rmX[5] = -Math.sin(angle);
    this.rmX[7] = Math.sin(angle);
    this.rmX[8] = Math.cos(angle);
  }

  rotateX(point: Point): Point {
    return {
      x: point.x,
      y: point.y * this.rmX[4] + point.z * this.rmX[5],
      z: point.y * this.rmX[7] + point.z * this.rmX[8],
      color: point.color
    };
  }

  rotateY(point: Point): Point {
    return {
      x: point.x * this.rmY[0] + point.z * this.rmY[5],
      y: point.y,
      z: point.x * this.rmY[6] + point.z * this.rmY[8],
      color: point.color
    };
  }

  rotateZ(point: Point): Point {
    return {
      x: point.x * this.rmZ[0] + point.y * this.rmZ[1],
      y: point.x * this.rmZ[3] + point.y * this.rmZ[4],
      z: point.z,
      color: point.color
    };
  }

  setRotation(angle: number, axis?: string): void {
    if (!axis) {
      this.rmZ[0] = Math.cos(angle);
      this.rmZ[1] = -Math.sin(angle);
      this.rmZ[3] = Math.sin(angle);
      this.rmZ[4] = Math.cos(angle);
    } else {
      if (axis === 'x') {
        this.rmX[4] = Math.cos(angle);
        this.rmX[5] = -Math.sin(angle);
        this.rmX[7] = Math.sin(angle);
        this.rmX[8] = Math.cos(angle);
      }
      if (axis === 'y') {
        this.rmY[0] = Math.cos(angle);
        this.rmY[2] = Math.sin(angle);
        this.rmY[6] = -Math.sin(angle);
        this.rmY[8] = Math.cos(angle);
      }
      if (axis === 'z') {
        this.rmZ[0] = Math.cos(angle);
        this.rmZ[1] = -Math.sin(angle);
        this.rmZ[3] = Math.sin(angle);
        this.rmZ[4] = Math.cos(angle);
      }
    }
  }

  setScale(scale: number): void {
    this.scale = scale;
  }

  setFocalLength(length: number): void {
    this.focalLength = length;
  }
}
