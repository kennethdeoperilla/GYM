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

  members: any[] = [];
  searchValue: string = '';
  genderValue: string = '';
  mem_Count: number = 0;
  femaleCount: number = 0;
  maleCount: number = 0;
  
  constructor(
    private membersService: MembersService,
    public router: Router
    ) {
  }

  ngOnInit(): void {
    this.membersService.getAllMembers().subscribe({
      next: (data) => {
        // console.log(data)
        
        this.members = data;
        this.mem_Count = data.length;

        data.forEach(element => {
          if(element.gender === "Male"){
            this.maleCount += 1;
          }
          else if(element.gender === "Female"){
            this.femaleCount += 1;
          }
        });
      },
      error: (e) => {
        console.log(e);
      }
    })
  }

  viewMember(memberId: any){
    this.router.navigateByUrl('members/edit/' + memberId);
  }

}
