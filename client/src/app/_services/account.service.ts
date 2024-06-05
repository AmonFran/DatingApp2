import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private currentUserSource = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSource.asObservable();
  constructor(private http: HttpClient) { }

  logIn(model: any) {
    return this.http.post<User>(environment.apiUrl + '/account/login', model).pipe(
      map(
        (response: User) => {
          const user = response;
          if (user) {
            this.setCurrentUser(user);
          }
        })
    );
  }
  register(model: any) {
    return this.http.post<User>(environment.apiUrl + '/account/register', model).pipe(
      map(
        (user) => {
          if (user) {
            this.setCurrentUser(user);
          }
        }
      )
    )
  }
  setCurrentUser(user: User) {
    user.roles = [];
    const roles = this.getDecodedToken(user.token).role;
    Array.isArray(roles) ? user.roles = roles : user.roles.push(roles);
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }
  logOut() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

  getDecodedToken(token: string) {
    return JSON.parse(atob(token.split(".")[1]))
  }
}
