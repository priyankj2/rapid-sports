export class ColorSet {
  palette = 0;

  constructor(palette: number) {
    this.palette = palette;
  }

  getColor(value: number): string {
    const red = this.getRed(value);
    const green = this.getGreen(value);
    const blue = this.getBlue(value);
    return 'rgb(' + red + ',' + green + ',' + blue + ')';
  }

  getRed(value: number): number {
    if (this.palette === 1) {
      if (value < 0.5) return 0;
      if (value > 0.75) return 255;
      return 127.5 - 127.5 * Math.cos(4 * Math.PI * (value - 0.5));
    } else {
      if (value < 0.5) return 0;
      if (value > 1) return 255;
      return 127.5 - 127.5 * Math.cos(2 * Math.PI * (value - 0.5));
    }
  }

  getGreen(value: number): number {
    if (this.palette === 1) {
      if (value < 0) return 0;
      if (value > 1) return 255;
      return 127.5 - 127.5 * Math.cos(Math.PI * value);
    } else {
      if (value < 0) return 0;
      if (value > 1) return 0;
      return 127.5 - 127.5 * Math.cos(2 * Math.PI * value);
    }
  }

  getBlue(value: number): number {
    if (this.palette === 1) {
      if (value < 0) return 0;
      if (value > 1) return 255;
      if (value < 0.5) return 100 - 100 * Math.cos(4 * Math.PI * value);
      if (value > 0.75) return 127.5 - 127.5 * Math.cos(4 * Math.PI * (value - 0.75));
      return 0;
    } else {
      if (value < 0) return 255;
      if (value > 0.5) return 0;
      return 127.5 + 127.5 * Math.cos(2 * Math.PI * value);
    }
  }
}
