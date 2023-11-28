import { BoundingBox } from 'app/core/boditrak/bounding-box.model';

export class VAxis extends BoundingBox {
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
    this.minimum = options.minimum ?? 0;
    this.maximum = options.maximum ?? 0;
    this.align = options.align ?? 'center';
    this.color = options.color ?? 'black';
    this.edge2edge = options.edge2edge ?? false;
  }

  draw(): void {
    let value = this.minimum;
    const range = this.maximum - this.minimum;
    const x =
      this.align === 'right'
        ? this.left + this.width - this.gap
        : this.align === 'left'
        ? this.left + this.gap
        : this.left + this.width / 2;
    const deltaY = this.height / (this.edge2edge ? this.ticks - 1 : this.ticks);
    let y = this.top + this.height - (this.edge2edge ? 0 : deltaY / 2);
    this.ctx.save();
    this.ctx.textBaseline = 'middle';
    this.ctx.textAlign = this.align;
    this.ctx.fillStyle = this.color;
    for (let t = 0; t < this.ticks; ++t) {
      this.ctx.fillText('' + value, x, y);
      y -= deltaY;
      value += range / (this.ticks - 1);
    }

    this.ctx.restore();
  }

  setRange(minimum: number, maximum: number): void {
    this.minimum = minimum;
    this.maximum = maximum;
  }
}
