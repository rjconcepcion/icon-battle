import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IconListComponent } from './icon-list/icon-list.component';
import { BattleComponent } from './battle/battle.component';
import { HeroFormComponent } from './hero-form/hero-form.component';
import { PlayerComponent } from './player/player.component';
import { MyIconsComponent } from './my-icons/my-icons.component';
import { AboutComponent } from './about/about.component';
import { IconDetailsComponent } from './icon-details/icon-details.component';

const routes: Routes = [
  { path: '', component: IconListComponent },
  { path: 'battle/:fakeIconId', component: BattleComponent },
  { path: 'testing-component', component: HeroFormComponent },
  { path: 'account', component: PlayerComponent },
  { path: 'my-icons', component: MyIconsComponent },  
  { path: 'about', component: AboutComponent },
  { path: 'details/:fakeIconId', component: IconDetailsComponent } 

  
];
MyIconsComponent
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
