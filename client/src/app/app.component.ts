import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { NavComponent } from './nav/nav.component';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { AccountService } from './_services/account.service';
import { User } from './_models/user';
import { HomeComponent } from './_pages/home/home.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TooltipModule, NavComponent, HomeComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Dating App';  
  accountService = inject(AccountService)
  ngOnInit(): void {    
    this.accountService.setCurrentUser();
  }
}
