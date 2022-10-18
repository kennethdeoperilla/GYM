import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Member } from '../models/member.model';

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
    return this.http.get<Member[]>(this.baseApiUrl + '/api/members');
  }

  addMember(addMemberRequest: Member): Observable<Member> {
    addMemberRequest.id = '00000000-0000-0000-0000-000000000000';
    return this.http.post<Member>(this.baseApiUrl + '/api/members', addMemberRequest)
  }

  getMember(id: string): Observable<Member> {
    return this.http.get<Member>(this.baseApiUrl + '/api/members/' + id)
  }

  updateMember(id: string, updateMemberRequest: Member):Observable<Member> { //kumukuha to ng 2 parameters. Una id, then pangalawa yung name
    //then call na sa http
    //lagay URL sa put. Same lang ng URL sa get member. Put requries body din. Kaya kelangan maglagay, after nung destination URL
    return this.http.put<Member>(this.baseApiUrl + '/api/members/' + id, updateMemberRequest)
  }

  deleteMember(id: string, deleteMemberRequest:Member):Observable<Member>{
    return this.http.delete<Member>(this.baseApiUrl + '/api/members/' + id)
  }

  

}
