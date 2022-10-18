import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-view-member',
  templateUrl: './view-member.component.html',
  styleUrls: ['./view-member.component.css']
})
export class ViewMemberComponent implements OnInit {

  viewForm!: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

}
