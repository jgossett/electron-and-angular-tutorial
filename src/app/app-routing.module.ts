import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BrowserComponent} from './browser/browser.component';

const routes: Routes = [
  { path: '', component: BrowserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
