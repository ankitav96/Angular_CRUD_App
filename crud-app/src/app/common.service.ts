import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  hasEmail: boolean = false;

  constructor(private http: HttpClient) { }

  createUser(user) {
    return this.http.post("http://localhost:3000/users", user)
  }

  getAllUser() {
    return this.http.get("http://localhost:3000/users");
  }

  updateUser(user) {
    return this.http.put("http://localhost:3000/users/" + user.id, user);
  }

  deleteUser(userId, user) {
    return this.http.delete("http://localhost:3000/users/" + userId, user);
  }

  searchUser(name, dept) {
    if (this.hasEmail == true) {
      if(name == ""){
        return this.http.get("http://localhost:3000/users?department=" + dept);
      }
      else if(dept == ""){
        return this.http.get("http://localhost:3000/users?email=" + name);
      }
      else{
        return this.http.get("http://localhost:3000/users?email=" + name + "&department=" + dept);
      }
    }
    else {
      if(name == ""){
        return this.http.get("http://localhost:3000/users?department=" + dept);
      }
      else if(dept == ""){
        return this.http.get("http://localhost:3000/users?name=" + name);
      }
      else{
        return this.http.get("http://localhost:3000/users?name=" + name + "&department=" + dept);
      }
    }
  }

}
