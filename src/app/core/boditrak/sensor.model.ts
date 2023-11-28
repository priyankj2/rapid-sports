export class Sensor {
  columns = 0;
  rows = 0;
  minimum = 0;
  maximum = 0;
  height = 0;
  width = 0;
  cellWidth = 0.0;
  units = 'psi';

  constructor(columns: number, rows: number, minimum: number, maximum: number, height: number, width: number, units: string) {
    this.columns = columns;
    this.rows = rows;
    this.minimum = minimum;
    this.maximum = maximum;
    this.height = height;
    this.width = width;
    // The height and width are in millimeters. They are not necessarily the same ratio.
    // Using the average length of a cell side.
    const heightRatio = (this.rows / this.height) * 100;
    const widthRatio = (this.columns / this.width) * 100;
    this.cellWidth = (heightRatio + widthRatio) / 2;
    this.units = units;
  }

  coordinatesFor(index: number): { x: number; y: number } {
    return {
      x: index % this.rows,
      y: Math.floor(index / this.rows)
    };


  }

  rotateReadings(rawReadings: number[]): number[] {
    const translatedReadings: number[] = [];
    let matrix: number[][] = [];
    for (let r = 0; r < this.rows; r++) {
      const currentRow: number[] = [];
      matrix.push(currentRow);
      for (let c = 0; c < this.columns; c++) {
        const readingIndex = r * this.columns + c;
        const v = rawReadings[readingIndex];
        currentRow.push(v);
      }
    }
    // rotate the matrix of values
    matrix = matrix[0].map((col, i) => matrix.map(row => row[i]));
    for (let i = 0; i < matrix.length; i++) {
      const row = matrix[i];
      for (let j = row.length - 1; j >= 0; j--) {
        translatedReadings.push(row[j]);
      }
    }
    console.log(translatedReadings, 'translated readings are here');

    return translatedReadings;
  }
}
