import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models';
import * as fromAppStore from 'src/app/core/store';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.scss'],
})
export class AdminListComponent implements OnInit {
  admins$: Observable<User[]>;

  constructor(
    private store: Store<fromAppStore.ApplicationManagementState>,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.admins$ = this.store.select(fromAppStore.getAdmins);
  }

  onCreateAdmin(): void {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
