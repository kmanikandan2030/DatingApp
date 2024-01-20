import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AccountService } from '../../../_services/account.service';
import { Member } from '../../../_models/member';
import { MembersService } from '../../../_services/members.service';
import { MemberCardComponent } from '../member-card/member-card.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [RouterOutlet, RouterLink, MemberCardComponent, CommonModule],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css'
})
export class MemberListComponent implements OnInit {
  members: Member[] = [];
  memberService = inject(MembersService);
  acctService = inject(AccountService);

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers(){
    this.memberService.getMembers().subscribe({
      next: result => this.members = result
    });
  }
}
