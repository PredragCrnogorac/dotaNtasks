import { HeroListComponent } from './components/hero-list/hero-list.component';
import { HeroDetailsComponent } from './components/hero-details/hero-details.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../shared/services/auth.guard';

const routes: Routes = [
  {
    path: 'heroes',
    children: [
      { path: '', component: HeroListComponent },
      { path: ':id', component: HeroDetailsComponent }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeroesRoutingModule { }
