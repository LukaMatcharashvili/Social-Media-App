import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { SearchProxyService } from 'src/app/services/proxy/search-proxy.service';
import { UserProxyService } from 'src/app/services/proxy/user-proxy.service';
import { UserNgrxService } from 'src/app/services/state manager/user-ngrx.service';

@Component({
  selector: 'app-search-user-pg',
  templateUrl: './search-user-pg.component.html',
  styleUrls: ['./search-user-pg.component.css'],
})
export class SearchUserPgComponent implements OnInit {
  searchBody: string = '';
  regUser: any = {};
  users: any = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private searchProxyS: SearchProxyService,
    private userNgRxS: UserNgrxService,
    private userProxyS: UserProxyService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((qParams: any) => {
      this.searchUser(qParams.searchBody);
      this.getRegisteredUser();
    });
  }

  searchUser(searchBody: string) {
    this.searchProxyS.getUserSearch(searchBody).subscribe((response: any) => {
      this.users = response;
    });
  }

  getRegisteredUser() {
    this.userNgRxS.getUserData().subscribe((user: any) => {
      this.regUser = user;
    });
  }

  onFollowClick(userId: string) {
    this.userProxyS.follow(userId).subscribe((response: any) => {
      this.snackBar.open(response.message, 'OK!');
    });
  }

  onUnfollowClick(userId: string) {
    this.userProxyS.unfollow(userId).subscribe((response: any) => {
      this.snackBar.open(response.message, 'OK!');
    });
  }
}
