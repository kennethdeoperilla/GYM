import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Member } from 'src/app/models/member.model';
import { ViewMembers } from 'src/app/models/viewMembers.model';
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
        // for(var i = 0; i++; i < members.length){
        //   this.members[i].firstName = members[i].firstName;
        //   this.members[i].lastName = members[i].lastName;
        //   this.members[i].contactNumber = members[i].contactNumber;

        //   // this.members[i].membershipStatus = true;
        // }
        
        this.members = members;
        console.log(this.members);
        this.mem_Count = members.length;
        
      },
    })
  }

  viewMember(memberId: any){
    this.router.navigateByUrl('members/edit/' + memberId);
  }

}
