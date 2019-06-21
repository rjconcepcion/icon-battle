import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IconListComponent } from './icon-list/icon-list.component';
import { BattleComponent } from './battle/battle.component';

const routes: Routes = [
  { path: '', component: IconListComponent },
  { path: 'battle/:fakeIconId', component: BattleComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
