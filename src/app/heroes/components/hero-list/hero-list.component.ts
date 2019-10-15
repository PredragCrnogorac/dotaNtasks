import { HeroesService } from '../../services/heroes.service';
import { Hero } from '../../models/hero';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.scss'],
  animations: [
    trigger('popOverState', [
      state('show', style({
        opacity: 1
      })),
      state('hide', style({
        opacity: 0
      })),
      transition('show => hide', animate('600ms ease-out')),
      transition('hide => show', animate('600ms ease-in'))
    ])
  ]
})
export class HeroListComponent implements OnInit {

  currentHero: Hero;
  heroes: Hero[] = [];
  strHeroes: Hero[] = [];
  agiHeroes: Hero[] = [];
  intHeroes: Hero[] = [];

  showStr = true;
  showInt = true;
  showAgi = true;

  constructor(
    private heroesService: HeroesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getAllHeroes();
    this.getStrHeroes();
    this.getAgiHeroes();
    this.getIntHeroes();
  }

  get stateNameStr() {
    return this.showStr ? 'show' : 'hide';
  }
  get stateNameAgi() {
    return this.showAgi ? 'show' : 'hide';
  }
  get stateNameInt() {
    return this.showInt ? 'show' : 'hide';
  }

  toggleStr() {
    this.showStr = true;
    this.showAgi = false;
    this.showInt = false;
  }
  toggleInt() {
    this.showStr = false;
    this.showAgi = false;
    this.showInt = true;
  }
  toggleAgi() {
    this.showStr = false;
    this.showAgi = true;
    this.showInt = false;
  }
  toggleAll(){
    this.showStr = true;
    this.showAgi = true;
    this.showInt = true;
  }

  getAllHeroes() {
    this.heroesService.getAll().subscribe(heroes => { this.heroes = heroes;
     }
    );
  }
  getStrHeroes() {
    this.heroesService.getByCat('strength').subscribe(heroes => { this.strHeroes = heroes; }
    );
  }
  getAgiHeroes() {
    this.heroesService.getByCat('agility').subscribe(heroes => { this.agiHeroes = heroes;  }
    );
  }

  getIntHeroes() {
    this.heroesService.getByCat('inteligence').subscribe(heroes => { this.intHeroes = heroes; }
    );
  }
  over(event) {
    const heroName = event.path[0].innerText;
    this.heroesService.getById(heroName.toLowerCase()).subscribe(hero => {
      this.currentHero = hero.data();
    });
  }
  heroDetail() {
    this.router.navigate(['heroes', this.currentHero.name.toLowerCase()]);
  }
}
