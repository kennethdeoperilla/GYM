import { Pipe, PipeTransform } from '@angular/core';
import { Member } from 'src/app/models/member.model';

@Pipe({
  name: 'genderfilter'
})
export class GenderfilterPipe implements PipeTransform {

  transform(members: Member[], genderValue: string): Member[] {
    if(!members || !genderValue){
      return members;
    }
    return members.filter(member=> 
      member.gender.toUpperCase() === genderValue.toUpperCase());
  }

}
