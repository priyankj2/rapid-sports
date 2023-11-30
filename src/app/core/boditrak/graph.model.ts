import { BoundingBox } from "./bounding-box.model";

export class Graph extends BoundingBox {
  private ctx: CanvasRenderingContext2D | null | undefined;
  private canvas: HTMLCanvasElement | undefined;
  private aspect = 0.0;
  private background?: string;
  private plots: BoundingBox[];
  private margins: any[];
  private pleft = 0;
  private ptop = 0;
  private pwidth = 0;
  private pheight = 0;

  constructor(canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, options: any) {
    super();
    this.canvas = canvas;
    this.ctx = context;
    this.aspect = 'aspect' in options ? options.aspect : 0;
    if ('background' in options) this.background = options.background;
    this.plots = [];
    this.margins = [null, null, null, null];
  }

  addPlot(plot: any): void {
    this.plots.push(plot);
  }

  setMargin(index: number, margin: any): void {
    this.margins[index] = margin;
  }

  setMargins(margins: any[]): void {
    this.margins = margins;
  }

  override setRect(left: number, top: number, width: number, height: number): void {
    super.setRect(left, top, width, height);
    let pleft: number;
    let ptop: number;
    let pwidth: number;
    let pheight: number;
    const margin = { left: 0, top: 0, right: 0, bottom: 0 };
    if (this.margins[0]) margin.left = typeof this.margins[0] === 'number' ? this.margins[0] : this.margins[0].width;
    if (this.margins[1]) margin.top = typeof this.margins[1] === 'number' ? this.margins[1] : this.margins[1].height;
    if (this.margins[2]) margin.right = typeof this.margins[2] === 'number' ? this.margins[2] : this.margins[2].width;
    if (this.margins[3]) margin.bottom = typeof this.margins[3] === 'number' ? this.margins[3] : this.margins[3].height;
    if (!this.aspect) {
      pleft = this.left + margin.left;
      ptop = this.top + margin.top;
      pwidth = this.width - margin.left - margin.right;
      pheight = this.height - margin.top - margin.bottom;
    } else {
      const pleft1 = this.left + margin.left;
      const pwidth1 = width - margin.left - margin.right;
      const pheight1 = pwidth1 / this.aspect;
      const ptop1 = this.top + margin.top + (height - pheight1 - margin.top - margin.bottom) / 2;
      const ptop2 = this.top + margin.top;
      const pheight2 = height - margin.top - margin.bottom;
      const pwidth2 = pheight2 * this.aspect;
      const pleft2 = this.left + margin.left + (width - pwidth2 - margin.left - margin.right) / 2;
      if (pwidth2 < width - margin.left - margin.right) {
        pleft = pleft2;
        ptop = ptop2;
        pwidth = pwidth2;
        pheight = pheight2;
      } else {
        pleft = pleft1;
        ptop = ptop1;
        pwidth = pwidth1;
        pheight = pheight1;
      }
    }
    if (this.margins[0] && typeof this.margins[0] === 'object')
      this.margins[0].setRect(pleft - this.margins[0].width, ptop, this.margins[0].width, pheight);
    if (this.margins[1] && typeof this.margins[1] === 'object')
      this.margins[1].setRect(pleft, ptop - this.margins[1].height, pwidth, this.margins[1].height);
    if (this.margins[2] && typeof this.margins[2] === 'object')
      this.margins[2].setRect(pleft + pwidth, ptop, this.margins[2].width, pheight);
    if (this.margins[3] && typeof this.margins[3] === 'object')
      this.margins[3].setRect(pleft, ptop + pheight, pwidth, this.margins[3].height);
    this.pleft = pleft;
    this.ptop = ptop;
    this.pwidth = pwidth;
    this.pheight = pheight;
    this.plots.forEach((plot: BoundingBox) => {
      plot.setRect(pleft, ptop, pwidth, pheight);
    });
  }

  override draw(): void {
    this.ctx?.save();
    if (this.background) {
      this.ctx!.fillStyle = this.background;
      this.ctx!.fillRect(this.pleft, this.ptop, this.pwidth, this.pheight);
    }
    this.margins.forEach(margin => {
      if (typeof margin === 'object') margin.draw();
    });
    this.plots.forEach(plot => {
      plot.draw();
    });
    this.ctx?.restore();
  }
}
