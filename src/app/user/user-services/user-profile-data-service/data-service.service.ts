import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { userInterface } from '@app/user/interface/user-interface';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  private user!: userInterface;

  private _userData = new BehaviorSubject<userInterface>(this.user);

  constructor() { }

  setUserData(user: userInterface) {
    this._userData.next(user);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('user_role', user.user_role);
    localStorage.setItem('user_first_name', user.personal_details.user_first_name);
    localStorage.setItem('user_id', user.id);
    // localStorage.setItem('user_role', user.user_role);


  }

  setLogIn() {
    localStorage.setItem('login', 'true');
  }

  setLogout() {
    // localStorage.setItem('login', 'false');
    localStorage.removeItem('user');
    localStorage.removeItem('user_role');
    localStorage.removeItem('user_first_name');
    localStorage.removeItem('user_id');
    localStorage.setItem('login', 'false');
  }

  getUserData() {
    // return this._userData.asObservable();
    const localUser = localStorage.getItem('user');
    console.log(localUser);
    const user = localUser ? JSON.parse(localUser) : null;
    console.log(user);
    // this._userData = user;
    // console.log(this._userData);
    this._userData.next(user);
    return this._userData.asObservable();
  }

  getLocalUserId() {
    return localStorage.getItem('user_id');
  }

  getLocalUserName() {
    return localStorage.getItem('user_first_name');
  }

  getLocalUserRole() {
    return localStorage.getItem('user_role');
  }


  isLogIn() {
    return localStorage.getItem('login');
  }

}
