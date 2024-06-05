import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private htpp: HttpClient) { }

  getUsersWithRoles() {
    return this.htpp.get<User[]>(environment.apiUrl + '/admin/users-with-roles');
  }
  updateUserRoles(username: string, roles: string) {
    return this.htpp.post<string[]>(environment.apiUrl + '/admin/edit-roles/' + username + '?roles=' + roles, {})
  }
}