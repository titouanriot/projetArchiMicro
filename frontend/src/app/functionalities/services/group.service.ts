import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  user: User | null = null;

  constructor(
    private authService: AuthenticationService,
    private http: HttpClient
  ) {
    this.authService.user.subscribe(u => this.user)
  }

  get_user_groups() {
    return this.http.get<any>(`${environment.backendBaseUrl}/group/from_owner`);
  }

  get_member_groups() {
    return this.http.get<any>(`${environment.backendBaseUrl}/group/from_member`);
  }

  get_group(id: number) {
    return this.http.get<any>(`${environment.backendBaseUrl}/group/${id}`);
  }

  get_members(id: number) {
    return this.http.get<any>(`${environment.backendBaseUrl}/group/${id}/members`);
  }

  addUser(email: string, group_name: string) {
    return this.http.post<any>(`${environment.backendBaseUrl}/group/add_user`, {group_name: group_name, email: email});
  }

  deleteGroup(group_name: string) {
    return this.http.request('delete', `${environment.backendBaseUrl}/group`, {body : {group_name: group_name}});
  }

  addGroup(group_name: string) {
    return this.http.put(`${environment.backendBaseUrl}/group/`, {group_name: group_name});
  }

}
