import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserHttpService {

  BASE_URL: string = "http://localhost:3000/usersData";

  private httpClient = inject(HttpClient);

  constructor() { }

  getLogin(email: string| null) {
    console.log(email);
    return this.httpClient.get<any>(`${this.BASE_URL}?email=${email}`);
  }

  getUsers() {
    return this.httpClient.get<any>(this.BASE_URL, { observe: "response" as const });
  }

  getUser(userid: string) {
    return this.httpClient.get<any>(`${this.BASE_URL}/${userid}`,)
  }

  addUser(user: Object) {
    return this.httpClient.post<any>(this.BASE_URL, user);
  }

  updateUser(userId: string, user: Object) {
    return this.httpClient.put<any>(`${this.BASE_URL}/${userId}`, user);
  }

  deleteUser(userId: string) {
    return this.httpClient.delete<any>(`${this.BASE_URL}/${userId}`);
  }

}
