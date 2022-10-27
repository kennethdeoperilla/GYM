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
    startDate: ''
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
              // console.log("Get member details:  ", response)
              this.memberDetails = response;
              this.form.patchValue(response);
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
      console.log("MemberDetails : ", this.memberDetails);

      var noChanges: any;
      
      console.log("No changes ",noChanges);

      if(
        this.memberDetails.firstName === record.firstName &&
        this.memberDetails.lastName === record.lastName &&
        this.memberDetails.gender === record.gender &&
        this.memberDetails.address === record.address &&
        this.memberDetails.contactNumber === record.contactNumber &&
        this.memberDetails.membershipValidity === record.membershipValidity &&
        formatDate(this.memberDetails.startDate,'yyyy-MM-dd','en') === formatDate(record.startDate,'yyyy-MM-dd','en')
        ){
          noChanges = true;
        }
        else{
          noChanges = false;
        }
        console.log("No changes ",noChanges);
        console.log("First name: {0}, {1}", this.memberDetails.firstName, record.firstName);

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
