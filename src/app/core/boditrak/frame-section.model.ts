export class FrameSection {
  minX = 0;
  minY = 0;
  maxX = 0;
  maxY = 0;

  constructor(topLeft: number[], bottomRight: number[]) {
    this.minX = topLeft[0];
    this.minY = topLeft[1];
    this.maxX = bottomRight[0];
    this.maxY = bottomRight[1];
  }

  contains(x: number, y: number): boolean {
    return this.minX <= x && this.maxX >= x && this.minY <= y && this.maxY >= y;
  }

  width(): number {
    return this.maxX - this.minX;
  }

  height(): number {
    return this.maxY - this.minY;
  }
}
