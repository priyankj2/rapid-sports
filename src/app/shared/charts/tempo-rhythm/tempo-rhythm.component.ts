import { Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-tempo-rhythm',
  templateUrl: './tempo-rhythm.component.html',
  styleUrl: './tempo-rhythm.component.css'
})
export class TempoRhythmComponent {
  dataArray: any = [];
  ngOnInit() {
    Chart.register(...registerables);
  }

  ngAfterViewInit() {
    let data: any,
      options: any,
      chart: any,
      ctx: any = document.getElementById('areaChart2') as HTMLElement;

    data = {
      labels: ['Apples', 'Oranges', 'Mixed Fruit'],
      datasets: [
        {
          label: 'Apples',
          data: [0, 50, 45, 100],
          backgroundColor: 'rgba(40,125,200,.5)',
          borderColor: 'rgb(40,100,200)',
          lineTension: 0,
          radius: 5,
        },
        {
          label: 'Oranges',
          data: [30, 90, 111, 20],
          backgroundColor: 'rgba(75,10,125,.5)',
          borderColor: 'rgb(75,10,125)',
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
