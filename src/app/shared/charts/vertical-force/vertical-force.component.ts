import { Component, ElementRef, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js/auto';
@Component({
  selector: 'app-vertical-force',
  templateUrl: './vertical-force.component.html',
  styleUrl: './vertical-force.component.css'
})
export class VerticalForceComponent {
  dataArray: any = [];
  decimalSequences: number[][] = [];
  sumOfSums: number[] = [];
  // Assuming this is your x-axis array
  xValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
  @ViewChild('areaChart', { static: true }) areaChart?: ElementRef<HTMLCanvasElement>;

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
      // console.log('this.decimalSequences', this.decimalSequences);
    }
  }

  calculateSums() {
    this.decimalSequences.forEach(sequence => {
      const sum = sequence.reduce((acc, curr) => acc + curr, 0);
      this.sumOfSums.push(sum);
    });
    // console.log('this.sumOfSums', this.sumOfSums);
  }
  ngOnInit() {
    Chart.register(...registerables);
  }

  ngAfterViewInit() {
    let data: any,
      options: any,
      chart: any,
      ctx: any = document.getElementById('areaChart') as HTMLElement;


    data = {
      labels: this.xValues,
      datasets: [
        {
          data: this.sumOfSums,
          backgroundColor: '#23f994',
          borderColor: '#23f994',
          fill: true,
          lineTension: 0.2,
          radius: 1,
        }
      ],
    };

    options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        }
      },
      animation: {
        duration: 2000, // Duration of the animation in milliseconds
        easing: 'easeInOutCubic' // Easing function
      }
    };

    chart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: options,
    });
  }
}
