import { Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';
@Component({
  selector: 'app-vertical-force',
  templateUrl: './vertical-force.component.html',
  styleUrl: './vertical-force.component.css'
})
export class VerticalForceComponent {
  dataArray: any = [];
  ngOnInit() {
    Chart.register(...registerables);
  }

  ngAfterViewInit() {
    let data: any,
      options: any,
      chart: any,
      ctx: any = document.getElementById('areaChart') as HTMLElement;

    // JSON:
    // Uncomment below and import * as data from 'json-path.json'.
    // Or Angular 14, create anonymous JSON array and fetch with http
    // constructor(private _http; HttpClient) {} ...
    // Replace datasets with dataArray

    // for (let key in chartData.items) {
    //   if (chartData.items.hasOwnProperty(key)) {
    //     this.dataArray.push(chartData.items[key]);
    //   }
    // }

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
