import { BoundingBox } from 'app/core/boditrak/bounding-box.model';

export class HAxis extends BoundingBox {
  canvas: any;
  ctx: any;
  ticks: number;
  gap = 6;
  minimum: number;
  maximum: number;
  align: string;
  color: string;
  edge2edge: boolean;

  constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, options: any) {
    super(options);
    this.canvas = canvas;
    this.ctx = context;

    if (!options) {
      options = {};
    }

    this.ticks = options.ticks ?? 10;
    this.width = options.width ?? 20;
    this.minimum = options.minimum ?? 0;
    this.maximum = options.maximum ?? 0;
    this.align = options.align ?? 'center';
    this.color = options.color ?? 'black';
    this.edge2edge = options.edge2edge ?? false;
  }

  draw(): void {
    let value = this.minimum;
    const range = this.maximum - this.minimum;
    const y =
      this.align === 'bottom' ? this.top + this.height - this.gap : this.align === 'top' ? this.top + this.gap : this.top + this.height / 2;
    const deltaX = this.width / (this.edge2edge ? this.ticks - 1 : this.ticks);
    let x = this.left + (this.edge2edge ? 0 : deltaX / 2);
    this.ctx.save();
    this.ctx.textBaseline = this.align;
    this.ctx.textAlign = 'center';
    this.ctx.fillStyle = this.color;
    for (let t = 0; t < this.ticks; ++t) {
      this.ctx.fillText(value.toString(), x, y);
      x += deltaX;
      value += range / (this.ticks - 1);
    }
    this.ctx.restore();
  }

  setRange(minimum: number, maximum: number): void {
    this.minimum = minimum;
    this.maximum = maximum;
  }
}
