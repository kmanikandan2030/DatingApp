import { Routes } from '@angular/router';
import { authGuard } from './_guards/auth.guard';

export const routes: Routes = [
  {path:'', loadComponent:()=>import('./_pages/home/home.component').then(c=>c.HomeComponent)},
  {
    path:'',
    runGuardsAndResolvers: 'always',
    canActivate: [authGuard],
    children: [
      {path:'members', loadChildren:()=>import('./_pages/members/members.routes').then(c=>c.MEMBER_ROUTES)},
      {path:'lists', loadComponent:()=>import('./_pages/lists/lists.component').then(c=>c.ListsComponent)},
      {path:'messages', loadComponent:()=>import('./_pages/messages/messages.component').then(c=>c.MessagesComponent)},
    ]
  },  
  {path:'**', loadComponent:()=>import('./_pages/home/home.component').then(c=>c.HomeComponent), pathMatch: 'full'}
];
