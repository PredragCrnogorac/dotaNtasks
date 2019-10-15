import { Hero } from './../../models/hero';
import { HeroesService } from './../../services/heroes.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-hero-details',
  templateUrl: './hero-details.component.html',
  styleUrls: ['./hero-details.component.scss']
})
export class HeroDetailsComponent implements OnInit {
  // hero stats per level chart component
  baseStats: {name: {base: number, gain: number}}[];
  display = false;

  heroId: string;
  hero: Hero;
  // youtube component
  youtube: YT.Player;
  private id = 'hohMj5asGvM';

  // chart component
  data: any;
  options: any;
  constructor(
    private heroService: HeroesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.heroId = params.get('id');

    });
    this.getHeroById(this.heroId);
  }

  getHeroById(id: string) {
    this.heroService.getById(id).subscribe(hero => {
      this.hero = hero.data();
      this.baseStats = hero.data().stats;
    },
      () => { },
      () => {
        this.instanceChart();
        this.display = true;
      });
  }

  // Youtube player
  savePlayer(player) {
    this.youtube = player;
  }
  onStateChange(event) {
  }

  // chart battle stats
  instanceChart() {
    this.data = {
      labels: Object.keys(this.hero.battlestats),
      datasets: [
        {
          label: 'My First dataset',
          backgroundColor: 'rgba(253,93,147,0.9)',
          borderColor: 'rgba(253,93,147,1)',
          pointBackgroundColor: 'rgba(179,181,198,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(179,181,198,1)',
          data: Object.values(this.hero.battlestats)
        }
      ],
    };
    this.options = {

      legend: {
        display: false
      },
      scale: {
        ticks: {
          backdropColor: '#130524',
          max: 100,
          min: 0
        },
        gridLines: {
          color: 'rgba(253,93,147,0.5)'
        },
        pointLabels: {
          fontSize: 15
        },
      },
      tooltips: {
        enabled: false
      }
    };

  }
}
