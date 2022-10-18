import { Pipe, PipeTransform } from '@angular/core';
import { Member } from 'src/app/models/member.model';

@Pipe({
  name: 'searchfilter'
})
export class SearchfilterPipe implements PipeTransform {

  transform(members: Member[], searchValue: string): Member[] {
    if(!members || !searchValue){
      return members;
    }
    return members.filter(member=>
      member.firstName.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())||
      member.lastName.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
      member.address.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
      );
  }

}
