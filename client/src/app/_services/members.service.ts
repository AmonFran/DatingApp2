import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Member } from '../_models/member.model';
import { environment } from 'src/environments/environment';
import { map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  members: Member[] = [];

  constructor(private http: HttpClient) { }

  getMembers() {
    if (this.members.length > 0) return of(this.members);
    return this.http.get<Member[]>(environment.apiUrl + "/users").pipe(
      map(members => {
        this.members = members;
        return members;
      })
    )
  }

  getMember(username: string) {
    const member = this.members.find(x => x.userName === username);
    if (member) return of(member);
    return this.http.get<Member>(environment.apiUrl + "/users/" + username);
  }

  updateMember(member: Member) {
    return this.http.put(environment.apiUrl + "/users", member).pipe(
      map(() => {
        const index = this.members.indexOf(member);
        this.members[index] = { ...this.members[index], ...member };
      })
    );
  }

  setMainPhoto(photoId: number) {
    return this.http.put(environment.apiUrl + "/users/set-main-photo/" + photoId, {});
  }

  deletePhoto(photoId: number) {
    return this.http.delete(environment.apiUrl + "/users/delete-photo/" + photoId, {});
  }
}
