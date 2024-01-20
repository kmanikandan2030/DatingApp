import { Component, Input, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from '../../../_models/member';
import { MembersService } from '../../../_services/members.service';
import { CommonModule } from '@angular/common';
import  {TabsModule} from 'ngx-bootstrap/tabs'
import { GalleryItem, GalleryModule, ImageItem } from 'ng-gallery';

@Component({
  selector: 'app-member-detail',
  standalone: true,
  imports: [CommonModule, TabsModule, GalleryModule],
  templateUrl: './member-detail.component.html',
  styleUrl: './member-detail.component.css'
})
export class MemberDetailComponent implements OnInit {
   @Input("id") username?: string;
   member: Member | undefined;
   memberService = inject(MembersService);
   images: GalleryItem[] = [];

  ngOnInit(): void {  
    //console.log(this.username);        
    this.loadMember()
  }

  loadMember(){
    if(this.username!=null)
      this.memberService.getMember(this.username).subscribe({
        next:(result)=>{
          this.member = result;
          this.getImages();
        }        
      });
  }

  getImages(){
    if(!this.member) return;
    for (const photo of this.member.photos) {
      this.images.push(new ImageItem({src: photo.url, thumb: photo.url}));      
    }
    
  }
}
