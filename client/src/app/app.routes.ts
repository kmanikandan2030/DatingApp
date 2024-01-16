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
  {path:'', loadChildren:()=>import('./errors/error.routes').then(c=>c.ERROR_ROUTES)},    
  {path:'**', loadComponent:()=>import('./errors/not-found/not-found.component').then(c=>c.NotFoundComponent), pathMatch: 'full'}  
];
