import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AccountService } from '../../../_services/account.service';

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css'
})
export class MemberListComponent {

  accountService = inject(AccountService);
  logout(){
    this.accountService.logout()
  }
}
