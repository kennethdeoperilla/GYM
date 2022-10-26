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
      next: (data :any) => {
        console.log(data)
        // for(var i = 0; i++; i < data.length){
        //   this.members[i].firstName = data[i].firstName;
        //   this.members[i].lastName = data[i].lastName;
        //   this.members[i].contactNumber = data[i].contactNumber;

        //   // this.members[i].membershipStatus = true;
        // }
        
        this.members = data;
        console.log("Members are: ",this.members);
        this.mem_Count = data.length;
        
      },
    })
  }

  viewMember(memberId: any){
    this.router.navigateByUrl('members/edit/' + memberId);
  }

}
