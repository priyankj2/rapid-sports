export class BoundingBox {
  left = 0;
  top = 0;
  width = 100;
  height = 100;

  constructor(options?: any) {
    if (options) {
      this.width = options.width ?? 100;
      this.height = options.height ?? 100;
    }
  }

  setRect(left: number, top: number, width: number, height: number): void {
    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;
  }

  draw(): void {}
}
