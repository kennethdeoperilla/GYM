import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Member } from '../models/member.model';
import { AddMember } from '../models/addMember.model';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  // updateMember(id: string, memberDetails: Member) {
  //   throw new Error('Method not implemented.');
  // }

  baseApiUrl: string = environment.baseApiURL
  constructor(private http: HttpClient) { }

  getAllMembers(): Observable<Member[]> {
    return this.http.get<Member[]>(this.baseApiUrl + '/api/members/getAllMembers');
  }

  addMember(addMemberRequest: AddMember): Observable<AddMember> {
    return this.http.post<AddMember>(this.baseApiUrl + '/api/members/addMember', addMemberRequest)
  }

  getMember(id: string) {
    return this.http.get(this.baseApiUrl + '/api/members/' + id)
  }

  updateMember(updateMemberRequest: any) { //kumukuha to ng 2 parameters. Una id, then pangalawa yung name
    //then call na sa http
    //lagay URL sa put. Same lang ng URL sa get member. Put requries body din. Kaya kelangan maglagay, after nung destination URL
    return this.http.post<Member>(this.baseApiUrl + '/api/members/updateMember/' , updateMemberRequest);
  }

  deleteMember(id: any){
    return this.http.post(this.baseApiUrl + '/api/members/deleteMember/' + id, null);
  }

  

}
