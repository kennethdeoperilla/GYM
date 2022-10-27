import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddMember } from 'src/app/models/addMember.model';
import { Member } from 'src/app/models/member.model';
import { MembersService } from 'src/app/service/members.service';


@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.css'],
  
  providers: [DatePipe]
})
export class AddMemberComponent implements OnInit {

  addMemberRequest: AddMember = { 
    firstName: '',
    lastName: '',
    gender: '',
    address: '',
    contactNumber: '',
    membershipValidity: 0,
    startDate: '',
  }

  myDate = new Date();
  dateNow: any;
  constructor(private memberService: MembersService, private router:Router,private datePipe: DatePipe) {
    this.dateNow = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
   }

  ngOnInit(): void {
    console.log("Datetime now: ", this.dateNow);
    this.addMemberRequest.startDate = this.dateNow;
  }

  addMember() {
    console.log("Add New Member: ", this.addMemberRequest);
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
