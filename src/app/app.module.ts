import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MembersListComponent } from './components/members/members-list/members-list.component';
import { AddMemberComponent } from './components/members/add-member/add-member.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { SearchfilterPipe } from './components/members/members-list/searchfilter.pipe';
import { GenderfilterPipe } from './components/members/members-list/genderfilter.pipe';
import { EditMemberComponent } from './components/members/edit-member/edit-member.component';
import { ViewMemberComponent } from './components/members/view-member/view-member.component';

@NgModule({
  declarations: [
    AppComponent,
    MembersListComponent,
    AddMemberComponent,
    SearchfilterPipe,
    GenderfilterPipe,
    EditMemberComponent,
    ViewMemberComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
