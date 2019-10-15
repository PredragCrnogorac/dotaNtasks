import { AppComponent } from './../app.component';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeroesRoutingModule } from './heroes-routing.module';
import { HeroListComponent } from './components/hero-list/hero-list.component';
import { HeroDetailsComponent } from './components/hero-details/hero-details.component';
import { StatChartComponent } from './components/stat-chart/stat-chart.component';

@NgModule({
  declarations: [HeroListComponent, HeroDetailsComponent, StatChartComponent],
  imports: [
    CommonModule,
    HeroesRoutingModule,
    SharedModule
  ]
})
export class HeroesModule { }
