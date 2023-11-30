import { BoundingBox } from "./bounding-box.model";

export class LinePlot extends BoundingBox {
  canvas: any;
  ctx: any;
  vertices: any[] = [];
  color = 0;
  minimumX = 0;
  maximumX = 100;
  minimumY = 0;
  maximumY = 100;

  constructor(canvasId: string, options: any) {
    super();
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
  }

  setVertices(vertices: any[]): void {
    this.vertices = vertices;
  }

  override draw(): void {
    if (this.vertices.length === 0) return;
    const scaleX = this.width / (this.maximumX - this.minimumX);
    const scaleY = this.height / (this.maximumY - this.minimumY);
    const minX = this.minimumX;
    const minY = this.minimumY;
    const left = this.left;
    const bottom = this.top + this.height;
    const ctx = this.ctx;
    this.ctx.save();
    this.ctx.strokeStyle = this.color;
    this.ctx.beginPath();
    this.vertices.forEach((vertex, index) => {
      if (index === 0) {
        ctx.moveTo(left + (vertex.x - minX) * scaleX, bottom - (vertex.y - minY) * scaleY);
      } else {
        ctx.lineTo(left + (vertex.x - minX) * scaleX, bottom - (vertex.y - minY) * scaleY);
      }
    });
    this.ctx.stroke();
    this.ctx.restore();
  }

  setRanges(minimumX: number, maximumX: number, minimumY: number, maximumY: number): void {
    this.minimumX = minimumX;
    this.maximumX = maximumX;
    this.minimumY = minimumY;
    this.maximumY = maximumY;
  }
}
