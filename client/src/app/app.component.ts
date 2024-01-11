import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TooltipModule } from 'ngx-bootstrap/tooltip';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TooltipModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Dating App';
  users: any = []
  httpclient = inject(HttpClient);

  ngOnInit(): void {
    this.httpclient.get('https://localhost:5001/api/users').subscribe({
      next: (res)=>{
        this.users = res;
        console.log(res);        
      },
      error: (err)=>{
        console.log(err);        
      },
      complete: ()=>{
        console.log("User request completed...");        
      }
    })
  }
}
