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

  studentRate: any;

  addMemberRequest: AddMember = { 
    firstName: '',
    lastName: '',
    gender: '',
    address: '',
    contactNumber: '',
    membershipValidity: 0,
    startDate: '',
  }

  get firstName() { return this.formModel.get('firstName'); }
  get lastName () { return this.formModel.get('lastName'); }
  get gender () { return this.formModel.get('gender'); }
  get address() { return this.formModel.get('address'); }
  get contactNumber() { return this.formModel.get('contactNumber'); }
  get isStudent() { return this.formModel.get('isStudent'); }
  get membershipValidity() { return this.formModel.get('membershipValidity'); }
  get startDate() { return this.formModel.get('startDate'); }

  constructor(
    private memberService: MembersService, 
    private router:Router,
    private datePipe: DatePipe,
    private toastr: ToastrService,
    public fb: FormBuilder,
    ) {
   }

  ngOnInit(): void {
    this.initializeForm();

    this.isStudent?.valueChanges.subscribe(value => {
      if(value==="true"){
        this.studentRate = true;
        console.log(this.isStudent?.value)
      }
      else if(value==="false"){
        this.studentRate = false;
        console.log(this.isStudent?.value)
      }
    })
  }

  initializeForm(){
    if(!this.formModel){
      this.formModel = this.fb.group({
        firstName: ['',Validators.required],
        lastName: ['',Validators.required],
        gender: ['',Validators.required],
        address: ['',Validators.required],
        contactNumber: ['',Validators.required],
        isStudent : ['', Validators.required],
        membershipValidity: ['',Validators.required],
        startDate: ['',Validators.required],
      })
    }
  }

  addMember() {
    if(this.formModel.valid){
      const record = this.formModel.getRawValue();
      console.log(record);
      
      this.memberService.addMember(record).subscribe({
        next: (data) => {
          // console.log(data);
          this.toastr.success("Member is added successfully.");
          setTimeout(() => this.router.navigate(['members']), 1000);
        },
        error: (e) =>{
          this.toastr.error(e.error);
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
