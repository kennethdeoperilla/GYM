import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMemberComponent } from './components/members/add-member/add-member.component';
import { EditMemberComponent } from './components/members/edit-member/edit-member.component';
import { MembersListComponent } from './components/members/members-list/members-list.component';
import { ViewMemberComponent } from './components/members/view-member/view-member.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component: MembersListComponent
  // },
  {
    path: 'members',
    component: MembersListComponent
  },
  {
    path: 'members/add',
    component: AddMemberComponent
  },
  {
    path: 'members/edit/:id',
    component: EditMemberComponent
  },
  {
    path: 'members/view/:id',
    component: ViewMemberComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
