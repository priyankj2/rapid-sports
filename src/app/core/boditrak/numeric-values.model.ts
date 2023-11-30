import { BoundingBox } from "./bounding-box.model";

export class NumericValues extends BoundingBox {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  color = 'black';
  columns = 0;
  rows = 0;
  values: number[] = [];
  enabled = false;

  constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, options: any) {
    super();
    this.canvas = canvas;
    this.ctx = context;
    if (options) {
      this.color = options.color ?? 'black';
      this.columns = options.columns ?? 0;
      this.rows = options.rows ?? 0;
    }
  }

  setValues(values: number[]): void {
    this.values = values;
  }

  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
  }

  override draw(): void {
    if (!this.enabled || !this.columns || !this.rows || this.values.length < this.columns * this.rows) return;
    const columnWidth = this.width / this.columns;
    const halfColumn = columnWidth / 2;
    const rowHeight = this.height / this.rows;
    const fontSize = rowHeight * 0.5;
    const rowOffset = rowHeight * 0.75;
    this.ctx.save();
    this.ctx.fillStyle = this.color;
    this.ctx.font = `${fontSize}pt "Ubuntu", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, HelveticaNeue-CondensedBold, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`;
    this.ctx.textAlign = 'center';
    let i = 0;
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.columns; c++, i++) {
        const value = this.values[i];
        if (value && value > 0.5) {
          this.ctx.fillText(`${Math.round(value)}`, this.left + halfColumn + columnWidth * c, this.top + rowOffset + rowHeight * r);
        }
      }
    }
    this.ctx.restore();
  }
}
