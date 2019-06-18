import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IconListComponent } from './icon-list/icon-list.component';

const routes: Routes = [
  { path: '', component: IconListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
