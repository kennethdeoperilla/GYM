import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
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

  memberDetails: ViewMemberDetails = {
    id: '',
    uniqueId: '',
    firstName: '',
    lastName: '',
    gender: '',
    address: '',
    contactNumber: '',
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

  
  // get membershipStatus() { return this.membershipStatusform.get('membershipStatus'); }

  constructor(
    private route: ActivatedRoute,
    private memberService: MembersService,
    private router: Router,
    public fb: FormBuilder
    ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        console.log(params);
        const id = params.get('id');

        if (id) {
          this.memberService.getMember(id).subscribe({
            next: (response: any) => {
              console.log("Get member details:  ", response)
              this.memberDetails = response;
              this.form.patchValue(response);
              this.startDate?.setValue(response.membershipStatus.startDate);
              console.log("StartDate: ", this.startDate?.value)
              this.membershipValidity?.setValue(response.membershipStatus.membershipValidity);
            }
          })
        }
      }
    })

    this.onViewMode();
    this.initializeForm();
    this.initializeAll();
  }

  initializeForm(){
    if(!this.form){
      this.form = this.fb.group({
        uniqueId: [''],
        firstName: [''],
        lastName: [''],
        gender: [''],
        address: [''],
        contactNumber: [''],
        membershipValidity: [''],
        startDate: [''],
      })
    }
  }

  initializeAll(){
    this.onViewMode();
    this.form.disable();
  }

  onViewMode(){
    //console.log("VIEW mode...");
    this.editMode = false;
  }

  onEditMode(){
    //console.log("Edit mode...");
    this.form.enable();
    this.editMode = true;
  }

  updateMember() {
    // call yung service
    //after ng call, invoke using subscribe method
    var record = this.form.getRawValue();
    console.log("Nagsend na ng: ", record);
    this.memberService.updateMember(this.memberDetails.id, record).subscribe({
      next: (member)=> {
        //console.log(member);
        this.router.navigate(['members']);
      },
      error: (e) => {
        console.log(e);
      }
    })
  }

  deleteMember(){
    this.memberService.deleteMember(this.memberDetails.id).subscribe({
      next:(data)=>{
        console.log(data);
        this.router.navigate(['members'])
      },
      error: (e) => {
        console.log(e);
      }
    })
  }

  edit(){
    this.onEditMode();
  }

  cancel(){
    //console.log("Cancel!");
    this.router.navigateByUrl('members');
  }



}
