import { Component, HostListener, OnInit, ViewChild, inject } from '@angular/core';
import { Member } from '../../../_models/member';
import { User } from '../../../_models/user';
import { AccountService } from '../../../_services/account.service';
import { MembersService } from '../../../_services/members.service';
import { take } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { GalleryModule } from 'ng-gallery';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-member-edit',
  standalone: true,
  imports: [CommonModule, TabsModule, GalleryModule, FormsModule],
  templateUrl: './member-edit.component.html',
  styleUrl: './member-edit.component.css'
})
export class MemberEditComponent implements OnInit {


member: Member | undefined
user: User | null = null
acctService = inject(AccountService);
memberService = inject(MembersService);
toastr = inject(ToastrService);
@ViewChild('editForm') editForm: NgForm | undefined;  

//Forcing browser to stop from navigating when there are changes made and not saved
@HostListener('window:beforeunload',['$event']) unloadNotification($event: any){
  if(this.editForm?.dirty){
    $event.returnValue = true;
  }
}

constructor(){
  this.acctService.currentUser$.pipe(take(1)).subscribe({
    next: result => this.user = result    
  })
}

ngOnInit(): void {
  this.loadMember();
}

loadMember(){
  if(!this.user) return;
  this.memberService.getMember(this.user.username).subscribe({
    next: result => this.member = result
  })
}

updateMember(){
  if(this.member){
    this.memberService.updateMember(this.member).subscribe({
      next: _=>{
        this.toastr.success('Profile update successfully')
        this.editForm?.reset(this.member);
      }
    })
    
  }
}

}
