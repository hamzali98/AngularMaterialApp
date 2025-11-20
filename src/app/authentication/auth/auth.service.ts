import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = signal(false);

  constructor() {}

  setLogIn(){
    this.isLoggedIn.set(true);
  }

  setLogout(){
    this.isLoggedIn.set(false);
  }

  isLogIn(){
    return this.isLoggedIn();
  }

}
