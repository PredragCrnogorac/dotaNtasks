import { Hero } from './../../models/hero';
import { Component, OnInit, Input } from '@angular/core';
import Chart from 'chart.js';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-stat-char',
  templateUrl: './stat-chart.component.html',
  styleUrls: ['./stat-chart.component.scss']
})
export class StatChartComponent implements OnInit {

  data: any;
  dataInt: number[] = [];
  dataStr: number[] = [];
  dataAgi: number[] = [];
  @Input() stats: any;

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.fillStatArrays();
    this.initChart();
  }

  fillStatArrays() {
    const baseAgi = this.stats.agi.base;
    const agiGain = this.stats.agi.gain;
    for (let i = 0; i < 26; i += 5) {
      this.dataAgi.push(baseAgi + agiGain * i);
    }
    const baseInt = this.stats.int.base;
    const intGain = this.stats.int.gain;
    for (let i = 0; i < 26; i += 5) {
      this.dataInt.push(baseInt + intGain * i);
    }
    const baseStr = this.stats.str.base;
    const strGain = this.stats.str.gain;
    for (let i = 0; i < 26; i += 5) {
      this.dataStr.push(baseStr + strGain * i);
    }
  }

  initChart() {
    this.data = {
      labels: ['0', '5', '10', '15', '20', '25'],
      datasets: [
        {
          label: 'Strength',
          data: this.dataStr,
          fill: false,
          borderColor: '#FF4500'
        },
        {
          label: 'Agility',
          data: this.dataAgi,
          fill: false,
          borderColor: '#7CFC00'
        },
        {
          label: 'Inteligence',
          data: this.dataInt,
          fill: false,
          borderColor: '#00BFFF'
        }
      ]
    };
  }
  selectData(event) {
    this.messageService.add({
      severity: 'info', summary: 'Data Selected', detail:
        this.data.datasets[event.element._datasetIndex].data[event.element._index]
    });
  }
}
