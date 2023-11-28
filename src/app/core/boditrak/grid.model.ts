import { BoundingBox } from '../boditrak/bounding-box.model';

export class Grid extends BoundingBox {
  canvas: any;
  ctx: any;
  columns: number;
  rows: number;
  color: string;
  background: string;

  constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, options: any) {
    super();
    this.canvas = canvas;
    this.ctx = context;

    if (!options) {
      options = {};
    }

    this.columns = options.columns ?? 10;
    this.rows = options.rows ?? 10;
    this.color = options.color ?? 'silver';
    this.background = options.background;
  }

  override draw(): void {
    this.ctx.save();
    if (this.background) {
      this.ctx.fillStyle = this.background;
      this.ctx.fillRect(this.left, this.top, this.width, this.height);
    }
    this.ctx.strokeStyle = this.color;
    for (let r = 0; r <= this.rows; ++r) {
      const y = this.top + Math.floor((r * this.height) / this.rows);
      this.ctx.beginPath();
      this.ctx.moveTo(this.left, y);
      this.ctx.lineTo(this.left + this.width, y);
      this.ctx.stroke();
    }
    for (let c = 0; c <= this.columns; ++c) {
      const x = this.left + Math.floor((c * this.width) / this.columns);
      this.ctx.beginPath();
      this.ctx.moveTo(x, this.top);
      this.ctx.lineTo(x, this.top + this.height);
      this.ctx.stroke();
    }
    this.ctx.restore();
  }
}
