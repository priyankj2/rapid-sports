import { Component, ElementRef, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-tempo-rhythm',
  templateUrl: './tempo-rhythm.component.html',
  styleUrl: './tempo-rhythm.component.css'
})
export class TempoRhythmComponent {
  dataArray: any = [];
  decimalSequences: number[][] = [];
  sumOfSums: number[] = [];
  // Assuming this is your x-axis array
  xValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
  @ViewChild('areaChart', { static: true }) areaChart?: ElementRef<HTMLCanvasElement>;
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
    console.log('backwing', sumOfXValues);

    // Get a subarray from xValues[indexOfBiggestYValue] to the end
    const subArrayFromIndex = this.xValues.slice(indexOfBiggestYValue);
    // Calculate the sum of values within the subarray
    const sumFromIndexToEnd = subArrayFromIndex.reduce((acc, curr) => acc + curr, 0);

    console.log('Downswing', sumFromIndexToEnd);

    console.log('Total Swing Duration: ' + (sumOfXValues + sumFromIndexToEnd));

    console.log('Rhythm: ' + (sumOfXValues / sumFromIndexToEnd));

    //
  }
  ngAfterViewInit() {
    let data: any,
      options: any,
      chart: any,
      ctx: any = document.getElementById('areaChart3') as HTMLElement;

    data = {
      labels: ['Apples', 'Oranges', 'Mixed Fruit'],
      datasets: [
        {
          label: 'Apples',
          data: [0, 50, 45, 100],
          backgroundColor: 'rgba(40,125,200,.5)',
          borderColor: 'rgb(40,100,200)',
          fill: true,
          lineTension: 0,
          radius: 5,
        },
        {
          label: 'Oranges',
          data: [30, 90, 111, 20],
          backgroundColor: 'rgba(75,10,125,.5)',
          borderColor: 'rgb(75,10,125)',
          fill: true,
          lineTension: 0.2,
          radius: 5,
        },
      ],
    };

    options = {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
    };

    chart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: options,
    });
  }
}
