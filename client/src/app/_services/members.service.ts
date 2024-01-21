import { Injectable, inject, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Member } from '../_models/member';
import { User } from '../_models/user';
import { map, of, switchMap, tap } from 'rxjs';
import { toObservable, toSignal } from "@angular/core/rxjs-interop";

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  private baseUrl = environment.apiUrl;
  private http = inject(HttpClient);
  private members: Member[]=[];
  constructor() { }

  getMembers(){
    if(this.members.length >0) return of(this.members);
    return this.http.get<Member[]>(this.baseUrl+'users').pipe(
      tap(result=>{
        this.members = result
      })
    );
  }

  getMember(username: string){
    const member = this.members.find(x=>x.userName === username);
    if(member) return of(member);
    return this.http.get<Member>(this.baseUrl+'users/'+username);
  }

  updateMember(member: Member){
    return this.http.put(this.baseUrl+'users',member).pipe(
      map(()=>{
        const index = this.members.indexOf(member);
        this.members[index] = {...this.members[index],...member}
      })
    );
  }

  private getHttpOptions(){    
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
