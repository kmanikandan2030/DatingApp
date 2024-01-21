import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';
import { User } from '../_models/user';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private BASE_URL: string = environment.apiUrl;
  private httpClient = inject(HttpClient)
  private router = inject(Router);  
  private currentUserSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor() { }

  login(model: any){
    return this.httpClient.post<User>(`${this.BASE_URL}account/login`, model).pipe(
      tap((response: User)=>{
        const user = response;
        if(user){
          localStorage.setItem('user', JSON.stringify(user))
          this.currentUserSource.next(user);          
        }        
      })
    );
  }

  register(model: any){
    return this.httpClient.post<User>(`${this.BASE_URL}account/register`, model).pipe(
      map(user=>{
        if(user){
          localStorage.setItem('user', JSON.stringify(user))
          this.currentUserSource.next(user);          
        }
        return user;
      })
    );
  }

  setCurrentUser(){
    const user: User = JSON.parse(localStorage.getItem('user')!);
    this.currentUserSource.next(user);
  }

  getCurrentUser(){
    const user: User = JSON.parse(localStorage.getItem('user')!);
    return user;
  }

  async logout(){    
    var result = await this.router.navigateByUrl("/");      
    if(result){        
      localStorage.removeItem('user');
      this.currentUserSource.next(null)
    }    
  }
}
