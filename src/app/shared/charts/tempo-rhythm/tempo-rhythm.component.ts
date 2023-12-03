import { Component, ElementRef, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-tempo-rhythm',
  templateUrl: './tempo-rhythm.component.html',
  styleUrl: './tempo-rhythm.component.css'
})
export class TempoRhythmComponent {
  dataArray: any = [];
  lineWidth: number = 2;
  decimalSequences: number[][] = [];
  sumOfSums: number[] = [];
  // Assuming this is your x-axis array
  xValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
  @ViewChild('areaChart', { static: true }) areaChart?: ElementRef<HTMLCanvasElement>;
  backSwing!: number;
  downSwing!: number;
  totalSwing!: number;
  rhythm!: number;
  ngOnInit() {
    Chart.register(...registerables);
  }

  constructor() {
    this.generateDecimalSequences(30);
    this.calculateSums();
  }


  generateDecimalSequences(count: number) {
    for (let i = 0; i < count; i++) {
      const sequence: number[] = [];
      for (let j = 0; j < 30; j++) {
        // +ve number
        // sequence.push(Math.random());
        // -ve number also
        sequence.push(Math.random() * 2 - 1);
      }
      this.decimalSequences.push(sequence);
    }
  }

  calculateSums() {
    this.decimalSequences.forEach(sequence => {
      const sum = sequence.reduce((acc, curr) => acc + curr, 0);
      this.sumOfSums.push(sum);
    });
    
    //
    const yValues = this.decimalSequences.map(sequence =>
      sequence.reduce((acc, curr) => acc + curr, 0)
    );

    // Find the biggest (maximum) y-axis value
    const biggestYValue = Math.max(...yValues);
    const indexOfBiggestYValue = yValues.indexOf(biggestYValue);
    const subArray = this.xValues.slice(0, indexOfBiggestYValue + 1);
    const sumOfXValues = subArray.reduce((acc, curr) => acc + curr, 0);
    // console.log('backwing', sumOfXValues);
    this.backSwing = sumOfXValues;

    // Get a subarray from xValues[indexOfBiggestYValue] to the end
    const subArrayFromIndex = this.xValues.slice(indexOfBiggestYValue);
    // Calculate the sum of values within the subarray
    const sumFromIndexToEnd = subArrayFromIndex.reduce((acc, curr) => acc + curr, 0);

    //console.log('Downswing', sumFromIndexToEnd);
    this.downSwing = sumFromIndexToEnd;

    //console.log('Total Swing Duration: ' + (sumOfXValues + sumFromIndexToEnd));
    this.totalSwing = sumOfXValues + sumFromIndexToEnd;
    this.rhythm = sumOfXValues / sumFromIndexToEnd;
    //console.log('Rhythm: ' + (sumOfXValues / sumFromIndexToEnd));
    this.changeLineWidth(this.backSwing);
    //
  }

  changeLineWidth(newWidth: number) {
    this.lineWidth = 2000 / newWidth;;
  }

}
