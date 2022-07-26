import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { UserProxyService } from 'src/app/services/proxy/user-proxy.service';
import { UserNgrxService } from 'src/app/services/state manager/user-ngrx.service';

@Component({
  selector: 'app-follower-pg',
  templateUrl: './follower-pg.component.html',
  styleUrls: ['./follower-pg.component.css'],
})
export class FollowerPgComponent implements OnInit {
  regUser: any = {};
  userId!: string;
  followers!: any[];
  constructor(
    private activatedRoute: ActivatedRoute,
    private userProxyS: UserProxyService,
    private userNgRx: UserNgrxService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.activatedRoute.parent?.params.subscribe((params: any) => {
      this.userId = params.userId;
      this.getRegisteredUSer();
      this.getFollowers(params.userId);
    });
  }

  getRegisteredUSer() {
    this.userNgRx.getUserData().subscribe((response: any) => {
      this.regUser = response;
    });
  }

  getFollowers(userId: string) {
    this.userProxyS.getFollowers(userId).subscribe((response: any) => {
      this.followers = response;
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
