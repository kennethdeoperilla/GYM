import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Member } from 'src/app/models/member.model';
import { MembersService } from 'src/app/service/members.service';

@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.css']
})
export class MembersListComponent implements OnInit {

  members: Member[] = [];
  searchValue: string = '';
  genderValue: string = '';
  mem_Count: number = 0;
  
  constructor(
    private membersService: MembersService,
    public router: Router
    ) {
  }

  ngOnInit(): void {
    this.membersService.getAllMembers().subscribe({
      next: (members) => {
        console.log(members)
        this.members = members;
        //console.log(members.length)
        this.mem_Count = members.length;
        // console.log(this.memberCount())

      },
    })
  }

  viewMember(memberId: any){
    this.router.navigateByUrl('members/edit/' + memberId);
  }

}
