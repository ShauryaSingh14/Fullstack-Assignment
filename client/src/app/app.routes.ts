import { Routes } from '@angular/router';
import { DetailpageComponent } from './detailpage/detailpage.component';
import { HomepageComponent } from './homepage/homepage.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent }, 
  { path: 'detail/:id', component: DetailpageComponent }, 
  { path: '**', redirectTo: '/' }, 
];
