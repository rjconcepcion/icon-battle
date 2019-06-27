import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IconListComponent } from './icon-list/icon-list.component';
import { BattleComponent } from './battle/battle.component';
import { HeroFormComponent } from './hero-form/hero-form.component';
import { AccountComponent } from './account/account.component';
import { PlayerComponent } from './player/player.component';

const routes: Routes = [
  { path: '', component: IconListComponent },
  { path: 'battle/:fakeIconId', component: BattleComponent },
  { path: 'testing-component', component: HeroFormComponent },
  { path: 'account', component: PlayerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
