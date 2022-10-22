import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Member } from 'src/app/models/member.model';
import { MembersService } from 'src/app/service/members.service';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css']
})
export class AddMemberComponent implements OnInit {

  addMemberRequest: Member = {
    id: '',
    firstName: '',
    lastName: '',
    gender: '',
    address: '',
    contactNumber: '',
    validity: '',
    date: '',
    startMonth: '',
    endMonth: '',
  }
  constructor(private memberService: MembersService, private router:Router) { }

  ngOnInit(): void {
  }

  addMember() {
    console.log(this.addMemberRequest)
    this.memberService.addMember(this.addMemberRequest).subscribe({
      next: (member) => {
        // console.log(member);
        this.router.navigate(['members'])
      },
      error: (members) =>
        console.log(members)
    })
  }

}
