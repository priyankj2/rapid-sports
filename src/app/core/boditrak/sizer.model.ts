import { BoundingBox } from "./bounding-box.model";

export class Sizer extends BoundingBox {
  columns: number;
  rows: number;
  spacing: number;
  edging: number;
  items: BoundingBox[] = [];

  constructor(columns: number, rows: number, options: any) {
    super();
    this.columns = columns;
    this.rows = rows;

    if (!options) {
      options = {};
    }

    this.spacing = options.spacing ?? 0;
    this.edging = options.edging ?? 0;
  }

  override setRect(left: number, top: number, width: number, height: number): void {
    super.setRect(left, top, width, height);
    const cspacing = (this.spacing * width) / 100;
    const rspacing = (this.spacing * height) / 100;
    const cedging = (this.edging * width) / 100;
    const redging = (this.edging * height) / 100;
    let voids = (this.columns - 1) * cspacing + 2 * cedging;
    const bwidth = (width - voids) / this.columns;
    voids = (this.rows - 1) * rspacing + 2 * redging;
    const bheight = (height - voids) / this.rows;
    let i = 0;
    for (let r = 0; r < this.rows; ++r) {
      for (let c = 0; c < this.columns; ++c, ++i) {
        if (this.items[i] && typeof this.items[i] === 'object') {
          this.items[i].setRect(left + cedging + c * (bwidth + cspacing), top + redging + r * (bheight + rspacing), bwidth, bheight);
        }
      }
    }
  }

  setItem(column: number, row: number, item: BoundingBox): void {
    if (column < 0 || column >= this.columns || row < 0 || row >= this.rows) {
      return;
    }
    this.items[row * this.columns + column] = item;
  }
}
