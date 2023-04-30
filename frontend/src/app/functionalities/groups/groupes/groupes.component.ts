import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { GroupService } from '../../services/group.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-groupes',
  templateUrl: './groupes.component.html',
  styleUrls: ['./groupes.component.scss']
})
export class GroupesComponent implements OnInit{
  displayedColumns: String[] = ["groupName"];

  user: User | null = null;

  mygroups: Array<{group_id: number, group_name: String}> = [];

  constructor(
    private authService: AuthenticationService,
    private groupService: GroupService,
    private router: Router
  ) {
    this.authService.user.subscribe(u => this.user)
  }

  ngOnInit(): void {
    this.get_member_groups();
  }

  get_member_groups() {
    this.groupService.get_member_groups().subscribe({
      next: values => {
        this.mygroups = values;
      }
    })
  }
}