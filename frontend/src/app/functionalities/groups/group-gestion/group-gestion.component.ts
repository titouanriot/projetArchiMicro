import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { GroupService } from '../../services/group.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-group-gestion',
  templateUrl: './group-gestion.component.html',
  styleUrls: ['./group-gestion.component.scss']
})
export class GroupGestionComponent implements OnInit{
  displayedColumns: String[] = ["groupName"];

  user: User | null = null;

  mygroups: Array<{group_id: number, group_name: String}> = [];

  groupName: string = '';

  error: boolean = false;

  constructor(
    private authService: AuthenticationService,
    private groupService: GroupService,
    private router: Router
  ) {
    this.authService.user.subscribe(u => this.user)
  }

  ngOnInit(): void {
    this.get_user_groups();
  }

  get_user_groups() {
    this.groupService.get_user_groups().subscribe({
      next: values => {
        this.mygroups = values;
      }
    })
  }

  display_details(id: number) {
    this.router.navigateByUrl("app/mes-groupes/"+id);
  }

  addGroup() {
    this.error = false;

    this.groupService.addGroup(this.groupName).subscribe({
      next: value => {
        this.get_user_groups();
      },
      error: err => {
        this.error = true;
      }
    })
  }


}
