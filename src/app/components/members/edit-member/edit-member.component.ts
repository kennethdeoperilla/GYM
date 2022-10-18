import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Member } from 'src/app/models/member.model';
import { MembersService } from 'src/app/service/members.service';

@Component({
  selector: 'app-edit-member',
  templateUrl: './edit-member.component.html',
  styleUrls: ['./edit-member.component.css']
})
export class EditMemberComponent implements OnInit {

  form!: FormGroup;

  editMode: boolean = false;

  memberDetails: Member = {
    id: '',
    firstName: '',
    lastName: '',
    gender: '',
    address: '',
    contactNumber: ''
  }

  get id() { return this.form.get('id'); }
  get firstName() { return this.form.get('firstName'); }
  get lastName() { return this.form.get('lastName'); }
  get gender() { return this.form.get('gender'); }
  get address() { return this.form.get('address'); }
  get contactNumber() { return this.form.get('contactNumber'); }

  constructor(
    private route: ActivatedRoute, 
    private memberService: MembersService, 
    private router: Router,
    public fb: FormBuilder
    ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id');

        if (id) {
          this.memberService.getMember(id).subscribe({
            next: (response) => {
              this.memberDetails = response;
              console.log("TOEDIT!");
              //console.log(response);
              this.form.patchValue(response);
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
        id: [''],
        firstName: [''],
        lastName: [''],
        gender: [''],
        address: [''],
        contactNumber: ['']
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
    //console.log(record);
    this.memberService.updateMember(this.memberDetails.id, record).subscribe({
      next: (member)=> {
        //console.log(member);
        this.router.navigate(['members']);
      }
    })
  }

  deleteMember(){
    this.memberService.deleteMember(this.memberDetails.id, this.memberDetails).subscribe({
      next:(member)=>
      this.router.navigate(['members'])
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
