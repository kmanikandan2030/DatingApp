import { Routes } from "@angular/router";

export const ERROR_ROUTES: Routes = [
  {path:'errors', loadComponent: () =>import('./test-error/test-error.component').then(c=>c.TestErrorComponent)},
  {path: 'not-found', loadComponent: () =>import('./not-found/not-found.component').then(c=>c.NotFoundComponent)},
  {path: 'server-error', loadComponent: ()=> import('./server-error/server-error.component').then(c=>c.ServerErrorComponent)}
]