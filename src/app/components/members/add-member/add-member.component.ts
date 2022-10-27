import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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

  formModel!: FormGroup;

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

  get firstName() { return this.formModel.get('firstName'); }
  get lastName () { return this.formModel.get('lastName'); }
  get gender () { return this.formModel.get('gender'); }
  get address() { return this.formModel.get('address'); }
  get contactNumber() { return this.formModel.get('contactNumber'); }
  get membershipValidity() { return this.formModel.get('membershipValidity'); }
  get registrationDate() { return this.formModel.get('registrationDate'); }

  constructor(
    private memberService: MembersService, 
    private router:Router,
    private datePipe: DatePipe,
    private toastr: ToastrService,
    public fb: FormBuilder,
    ) {
    this.dateNow = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
   }

  ngOnInit(): void {
    // console.log("Datetime now: ", this.dateNow);
    this.addMemberRequest.startDate = this.dateNow;

    this.initializeForm();
  }

  initializeForm(){
    if(!this.formModel){
      this.formModel = this.fb.group({
        firstName: ['',Validators.required],
        lastName: ['',Validators.required],
        gender: ['',Validators.required],
        address: ['',Validators.required],
        contactNumber: ['',Validators.required],
        membershipValidity: ['',Validators.required],
        registrationDate: ['',Validators.required],
      })
    }
    else{
      this.toastr.error("Please input in all fields.")
    }
  }

  addMember() {
    if(this.formModel.valid){
      // console.log("Add New Member: ", this.addMemberRequest);

      const record = this.formModel.getRawValue();
      // console.log(record);

      this.memberService.addMember(record).subscribe({
        next: (member) => {
          // console.log(member);
          this.toastr.success("Member is added successfully.");
          setTimeout(() => this.router.navigate(['members']), 1000);
        },
        error: (e) =>{
          this.toastr.error(e.error);
          console.log(e);
        }
      })
    }
    else{
      this.toastr.warning("Please check all fields. Do not leave empty inputs.");
    }
  }

  cancel(){
    this.router.navigateByUrl('members');
  }

}
