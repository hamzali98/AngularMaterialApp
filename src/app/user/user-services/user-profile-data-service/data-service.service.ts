import { Injectable } from '@angular/core';
import { userInterface } from '@app/user/interface/user-interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  private user! : userInterface; 

  private _userData = new BehaviorSubject<userInterface>(this.user);

constructor() { }

setUserData(user: userInterface){
  this._userData.next(user);
}

getUserData(){
  return this._userData.asObservable();
}

}
