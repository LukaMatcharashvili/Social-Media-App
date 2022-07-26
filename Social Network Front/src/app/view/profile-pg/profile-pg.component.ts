import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { LoginLogoutEmitterService } from 'src/app/services/emitters/login-logout-emitter.service';
import { PostAddEmitterService } from 'src/app/services/emitters/post-add-emitter.service';
import { AuthProxyService } from 'src/app/services/proxy/auth-proxy.service';
import { PostProxyService } from 'src/app/services/proxy/post-proxy.service';
import { UserProxyService } from 'src/app/services/proxy/user-proxy.service';
import { UserNgrxService } from 'src/app/services/state manager/user-ngrx.service';
import { AddNewPostModComponent } from '../add-new-post-mod/add-new-post-mod.component';
import { DeletePostModComponent } from '../delete-post-mod/delete-post-mod.component';
import { DeleteUserModComponent } from '../delete-user-mod/delete-user-mod.component';
import { UpdatePostModComponent } from '../update-post-mod/update-post-mod.component';
import { UpdateUserModComponent } from '../update-user-mod/update-user-mod.component';

@Component({
  selector: 'app-profile-pg',
  templateUrl: './profile-pg.component.html',
  styleUrls: ['./profile-pg.component.css'],
})
export class ProfilePgComponent implements OnInit {
  userData: any = {};
  regUser: any = {};
  posts!: any[];
  currentRoute: any = '';

  constructor(
    private userNgRxS: UserNgrxService,
    private dialog: MatDialog,
    private router: Router,
    private loginoutEmitter: LoginLogoutEmitterService,
    private activatedRoute: ActivatedRoute,
    private userProxyS: UserProxyService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: any) => {
      this.getRegisteredUser();
      this.getUserProfile(params.userId);
    });
    this.currentRoute = this.router.url;
    this.router.events.subscribe((val: any) => {
      if (val instanceof NavigationEnd) {
        this.currentRoute = val.urlAfterRedirects;
      }
    });
  }

  getUserProfile(userId: string) {
    this.userProxyS.getUserById(userId).subscribe((response: any) => {
      const { password, verificationToken, ...user } = response;
      this.userData = user;
    });
  }

  getRegisteredUser() {
    this.userNgRxS.getUserData().subscribe((response: any) => {
      this.regUser = response;
    });
  }

  openDeleteUserModuleBtnClick() {
    this.dialog.open(DeleteUserModComponent);
  }

  openUpdateUserFormBtnClick() {
    this.dialog.open(UpdateUserModComponent);
  }

  logOut() {
    localStorage.removeItem('jwt');
    this.userNgRxS.deleteUserData();
    this.loginoutEmitter.loginlogoutEmitter.emit(false);
    this.router.navigate(['login']);
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
