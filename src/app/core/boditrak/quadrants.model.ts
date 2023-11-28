import { BoundingBox } from 'app/core/boditrak/bounding-box.model';

export class Quadrants extends BoundingBox {
  canvas: any;
  ctx: any;
  color: string;

  constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, options: any) {
    super();
    this.canvas = canvas;
    this.ctx = context;

    if (!options) {
      options = {};
    }

    this.color = options.color ?? '#424242';
  }

  draw(): void {
    this.ctx.save();
    this.ctx.strokeStyle = this.color;
    this.ctx.lineWidth = 5;

    const middleX = this.left + this.width / 2;
    this.ctx.beginPath();
    this.ctx.moveTo(middleX, this.top);
    this.ctx.lineTo(middleX, this.top + this.height);
    this.ctx.stroke();

    const middleY = this.top + this.height / 2;
    this.ctx.beginPath();
    this.ctx.moveTo(this.left, middleY);
    this.ctx.lineTo(this.left + this.width, middleY);
    this.ctx.stroke();
    this.ctx.restore();
  }
}
