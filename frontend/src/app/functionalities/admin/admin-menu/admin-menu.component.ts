import { Component, OnInit, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Account } from 'src/app/models/account';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class AdminMenuComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  listUsers: Account[] = <Account[]>[];
  listUsersToDisplay : any;

  constructor(public dialog: MatDialog, private adminService : AdminService) { }
  columnsToDisplay = ['first_name', 'last_name', 'email', 'is_user_account_active', 'is_admin'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: Account | null = null;

  ngOnInit(): void {
    this.adminService.getAllUsers().then(
      listUsers => {
        this.listUsers = this.adminService.listUsers;
        this.listUsersToDisplay = new MatTableDataSource(this.listUsers);
        this.listUsersToDisplay.paginator = this.paginator;
        this.listUsersToDisplay.sort = this.sort;
      }
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.listUsersToDisplay.filter = filterValue.trim().toLowerCase();
    if (this.listUsersToDisplay.paginator) {
      this.listUsersToDisplay.paginator.firstPage();
    }
  }

}
