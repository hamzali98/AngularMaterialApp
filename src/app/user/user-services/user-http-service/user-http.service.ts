import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserHttpService {

  BaseUrl: string = "http://localhost:3000/usersData";

  private httpClient = inject(HttpClient);

  constructor() { }

  getUsers() {
    return this.httpClient.get<any>(this.BaseUrl, { observe: "response" as const });
  }

  getUser(userid: string) {
    return this.httpClient.get<any>(`${this.BaseUrl}/${userid}`,)
  }

  addUser(user: Object) {
    return this.httpClient.post<any>(this.BaseUrl, user);
  }

  updateUser(userId: string, user : Object){
    return this.httpClient.put<any>(`${this.BaseUrl}/${userId}`, user);
  }

  deleteUser(userId: string) {
    return this.httpClient.delete<any>(`${this.BaseUrl}/${userId}`);
  }

}
