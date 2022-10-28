import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Member } from 'src/app/models/member.model';
import { ViewMemberDetails } from 'src/app/models/viewMemberDetails.model';
import { MembersService } from 'src/app/service/members.service';


@Component({
  selector: 'app-edit-member',
  templateUrl: './edit-member.component.html',
  styleUrls: ['./edit-member.component.css']
})
export class EditMemberComponent implements OnInit {

  form!: FormGroup;
  // membershipStatusform!: FormGroup;

  editMode: boolean = false;
  memberId: any;
  date: any;
  studentRate:  boolean = false;

  memberDetails: ViewMemberDetails = {
    id: '',
    uniqueId: '',
    firstName: '',
    lastName: '',
    gender: '',
    address: '',
    contactNumber: '',
    membershipValidity: '',
    membershipStatus: '',
    startDate: '',
    isStudent: ''
  }

  get uniqueId() { return this.form.get('uniqueId'); }
  get firstName() { return this.form.get('firstName'); }
  get lastName() { return this.form.get('lastName'); }
  get gender() { return this.form.get('gender'); }
  get address() { return this.form.get('address'); }
  get contactNumber() { return this.form.get('contactNumber'); }
  get membershipValidity() { return this.form.get('membershipValidity'); }
  get startDate() { return this.form.get('startDate'); }
  get membershipStatus() { return this.form.get('membershipStatus'); }
  get isStudent() { return this.form.get('isStudent'); }

  constructor(
    private route: ActivatedRoute,
    private memberService: MembersService,
    private router: Router,
    public fb: FormBuilder,
    private toastr: ToastrService,
    ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        // console.log(params);
        const id = params.get('id');

        if (id) {
          this.memberService.getMember(id).subscribe({
            next: (response: any) => {
              console.log("Get member details:  ", response)
              this.memberDetails = response;
              // this.form.patchValue(response);
              this.uniqueId?.patchValue(response.uniqueId);
              this.firstName?.patchValue(response.firstName);
              this.lastName?.patchValue(response.lastName);
              this.gender?.patchValue(response.gender);
              this.address?.patchValue(response.address);
              this.contactNumber?.patchValue(response.contactNumber);
              this.isStudent?.patchValue(response.isStudent);
              this.membershipStatus?.patchValue(response.membershipStatus);
              if(response.isStudent === "True"){
                this.studentRate = true;
                console.log("Student!");
              }
              else{
                this.studentRate = false;
                console.log("Not student!");
              }
              this.membershipValidity?.patchValue(response.membershipValidity);

              this.startDate?.patchValue(formatDate(response.startDate,'yyyy-MM-dd','en'));
            }
          })
        }
      },
      error: (e) => {
        this.toastr.error(e.error);
      }
    })

    this.onViewMode();
    this.initializeForm();
    this.initializeAll();

    this.isStudent?.valueChanges.subscribe(value => {
      if(value==="True"){
        this.studentRate = true;
        console.log(this.isStudent?.value)
        console.log("Student!");
      }
      else if(value==="False"){
        this.studentRate = false;
        console.log(this.isStudent?.value)
        console.log("Not student!");
      }
    })
  }

  initializeForm(){
    if(!this.form){
      this.form = this.fb.group({
        uniqueId: ['',Validators.required],
        firstName: ['',Validators.required],
        lastName: ['',Validators.required],
        gender: ['',Validators.required],
        address: ['',Validators.required],
        contactNumber: ['',Validators.required],
        isStudent: ['',Validators.required],
        membershipValidity: ['',Validators.required],
        startDate: ['',Validators.required],
        membershipStatus: ['',Validators.required],
      })
    }
  }

  initializeAll(){
    this.onViewMode();
    this.form.disable();
  }

  onViewMode(){
    this.editMode = false;
  }

  onEditMode(){
    this.form.enable();
    this.editMode = true;
  }

  updateMember() {
    if(this.form.valid){

      var record = this.form.getRawValue();
      console.log("Record : ", record);
      // console.log("MemberDetails : ", this.memberDetails);

      var noChanges: any;

      if(
        this.memberDetails.firstName === record.firstName &&
        this.memberDetails.lastName === record.lastName &&
        this.memberDetails.gender === record.gender &&
        this.memberDetails.address === record.address &&
        this.memberDetails.contactNumber === record.contactNumber &&
        this.memberDetails.membershipValidity === record.membershipValidity &&
        this.memberDetails.isStudent === record.isStudent &&
        formatDate(this.memberDetails.startDate,'yyyy-MM-dd','en') === formatDate(record.startDate,'yyyy-MM-dd','en')
        ){
          noChanges = true;
        }
        else{
          noChanges = false;
        }

      if(!noChanges){
        this.memberService.updateMember({
          id: this.memberDetails.id,
          firstName: record.firstName,
          lastName: record.lastName,
          gender: record.gender,
          address: record.address,
          contactNumber: record.contactNumber,
          membershipValidity: record.membershipValidity,
          startDate: record.startDate,
          isStudent: record.isStudent,
        }).subscribe({
          next: (member)=> {
            //console.log(member);
            this.toastr.success("Member details are updated successfully.");
            setTimeout(() => this.router.navigate(['members']), 1000);
          },
          error: (e) => {
            this.toastr.error(e.error);
            // console.log(e);
          }
        })
      }
      else{
        this.toastr.warning("No changes have been made.")
      }
    }
    else{
      this.toastr.warning("Please check all fields. Do not leave empty inputs.");
    }
  }

  deleteMember(){
    this.memberService.deleteMember(this.memberDetails.id).subscribe({
      next:(data)=>{
        // console.log(data);
        this.toastr.success("Member is deleted successfully.");
        setTimeout(() => this.router.navigate(['members']), 1000);
      },
      error: (e) => {
        this.toastr.error(e.error);
        // console.log(e);
      }
    })
  }

  edit(){
    this.onEditMode();
  }

  cancel(){
    this.router.navigateByUrl('members');
  }



}
