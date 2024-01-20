import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Member } from '../_models/member';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;
  http = inject(HttpClient);
  constructor() { }

  getMembers(){
    return this.http.get<Member[]>(this.baseUrl+'users');
  }

  getMember(username: string){
    return this.http.get<Member>(this.baseUrl+'users/'+username);
  }

  getHttpOptions(){    
    const userString = localStorage.getItem('user');
    if(!userString) return;
    const user: User = JSON.parse(userString);
    return {
      headers: new HttpHeaders({
        Authorization: 'Bearer '+user.token
      })
    }
  }
}
