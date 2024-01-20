import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { Observable, of } from 'rxjs';
import { User } from '../_models/user';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule,BsDropdownModule, CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {
  model: any = {
    UserName: 'lisa',
    Password: 'Pa$$w0rd'
  };  
  accountService = inject(AccountService);
  router = inject(Router);
  toastr = inject(ToastrService);
  
  ngOnInit(): void {}

  login(){
    this.accountService.login(this.model).subscribe({
      next: _=> this.router.navigateByUrl("/members")
    });
  }

  logout(){    
    this.accountService.logout();    
  }
}
