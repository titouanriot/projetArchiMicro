import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupService } from '../../services/group.service';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.scss']
})
export class GroupDetailComponent implements OnInit, OnDestroy{

  displayedColumns: Array<string> = ["memberMail"];
  private sub: any;
  private groupId: number = 0;

  groupInfo: {id_group: number, group_name: string, owner: number} = {id_group: 0, group_name: '', owner: 0};
  groupMembers: Array<String> = [];

  userEmail: string = '';

  error = false;

  constructor(
    private route: ActivatedRoute,
    private groupService: GroupService,
    private router: Router
  ){}


  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.groupId = +params['groupId'];
    });

    this.groupService.get_group(this.groupId).subscribe({
      next: value => {
        this.groupInfo = value;
      }
    })

    this.groupService.get_members(this.groupId).subscribe({
      next: values => {
        this.groupMembers = values;
      }
    })
  }

  ngOnDestroy(): void {
      this.sub.unsubscribe();
  }


  addUser() {
    this.error = false;

    this.groupService.addUser(this.userEmail, this.groupInfo.group_name).subscribe({
      next: value => {
        this.groupService.get_members(this.groupId).subscribe({
          next: values => {
            this.groupMembers = values;
          }
        })
      },
      error: err => {
        this.error = true;
      }
    })
  }


  deleteGroup() {
    this.groupService.deleteGroup(this.groupInfo.group_name).subscribe({
      next: value => {
        this.router.navigateByUrl('/app/mes-groupes');
      }
    })
  }


}
