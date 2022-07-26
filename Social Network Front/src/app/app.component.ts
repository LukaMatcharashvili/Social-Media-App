import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoadingService } from './interceptors/loading.service';
import { LoginLogoutEmitterService } from './services/emitters/login-logout-emitter.service';
import { UserNgrxService } from './services/state manager/user-ngrx.service';
import { DeleteUserModComponent } from './view/delete-user-mod/delete-user-mod.component';
import { UpdateUserModComponent } from './view/update-user-mod/update-user-mod.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'social-network-front';
  panelOpenState = false;
  afterLoginDisplay: boolean = localStorage.getItem('jwt') ? true : false;
  userData: any = {};
  searchValue: any;
  loader: boolean = false;

  constructor(
    private loginoutEmitter: LoginLogoutEmitterService,
    private userNgRxS: UserNgrxService,
    private router: Router,
    private dialog: MatDialog,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.setLoading();
    this.userNgRxS.getUserData().subscribe((response: any) => {
      this.userData = response;
    });
    this.loginoutEmitter.loginlogoutEmitter.subscribe((response: boolean) => {
      this.afterLoginDisplay = response;
    });
  }

  setLoading() {
    this.loadingService.loadingEmitter.subscribe((response: any) => {
      this.loader = response;
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
}
