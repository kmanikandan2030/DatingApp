import { Routes } from "@angular/router";
import { MemberListComponent } from "./member-list/member-list.component";

export const MEMBER_ROUTES: Routes = [
  {path:'', component: MemberListComponent },
  {path:':id', loadComponent: ()=>import('./member-detail/member-detail.component').then(c=>c.MemberDetailComponent) }
]