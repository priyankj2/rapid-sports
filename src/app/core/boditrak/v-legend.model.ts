import { BoundingBox } from "./bounding-box.model";
import { Heatmap } from "./heat-map.model";
import { VAxis } from "./v-axis.model";

export class VLegend extends BoundingBox {
  canvas: any;
  ctx: any;
  background = 'black';
  color = 'black';
  override width = 60;
  align = 'center';
  gap = 0;
  bandWidth = 20;
  heatmap: Heatmap;
  vaxis: VAxis;

  constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, options: any) {
    super();
    this.canvas = canvas;
    this.ctx = context;

    if (!options) {
      options = {};
    }

    options.columns = 47;
    options.rows = 16;
    options.minimum = options.minimum ?? 0;
    options.maximum = options.maximum ?? 100;
    this.background = options.background ?? 'black';
    this.width = options.width ?? 60;
    this.align = options.align ?? 'center';
    this.gap = options.gap ?? 0;
    this.bandWidth = options.bandWidth ?? 20;

    this.heatmap = new Heatmap(canvas, context, options);
    const values = [];
    const delta = (options.maximum - options.minimum) / 10;
    for (let r = 0; r < 10; ++r) {
      for (let c = 0; c < 3; ++c) {
        values.push(options.maximum - r * delta);
      }
    }
    this.heatmap.setValues(values);
    this.vaxis = new VAxis(canvas, context, options);
  }

  getBandRect(): any {
    if (this.align === 'left') {
      return { left: this.left + this.gap, top: this.top, width: this.bandWidth, height: this.height };
    } else if (this.align === 'right') {
      return {
        left: this.left + this.width - this.bandWidth - this.gap,
        top: this.top,
        width: this.bandWidth,
        height: this.height
      };
    } else if (this.gap) {
      return { left: this.left + this.gap, top: this.top, width: this.width - 2 * this.gap, height: this.height };
    } else if (this.bandWidth) {
      return {
        left: this.left + this.width / 2 - this.bandWidth / 2,
        top: this.top,
        width: this.bandWidth,
        height: this.height
      };
    } else {
      return { left: this.left, top: this.top, width: this.width, height: this.height };
    }
  }

  override setRect(left: number, top: number, width: number, height: number): void {
    super.setRect(left, top, width, height);
    const rect = this.getBandRect();
    if (this.heatmap) {
      this.heatmap["setRect"](rect.left, rect.top, rect.width, rect.height);
    }
    if (this.vaxis) {
      if (this.align === 'left') {
        this.vaxis.setRect(rect.left + rect.width, this.top, this.width - rect.left - rect.width, this.height);
      } else if (this.align === 'right') {
        this.vaxis.setRect(this.left, this.top, this.width - rect.left, this.height);
      } else {
        this.vaxis.setRect(rect.left, rect.top, rect.width, rect.height);
      }
    }
  }

  override draw(): void {
    const rect = this.getBandRect();
    this.ctx.save();
    this.ctx.fillStyle = this.background;
    this.ctx.fillRect(rect.left, rect.top, rect.width, rect.height);
    this.ctx.restore();

    this.heatmap.draw();
    this.vaxis.draw();

    this.ctx.save();
    this.ctx.strokeStyle = this.color;
    this.ctx.strokeRect(rect.left + 0.5, rect.top + 0.5, rect.width - 1, rect.height - 1);
    this.ctx.restore();
  }

  setRange(minimum: number, maximum: number): void {
    this.vaxis.setRange(minimum, maximum);
  }
}
