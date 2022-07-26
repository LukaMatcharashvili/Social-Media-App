import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginLogoutEmitterService } from 'src/app/services/emitters/login-logout-emitter.service';
import { AuthProxyService } from 'src/app/services/proxy/auth-proxy.service';
import { UserNgrxService } from 'src/app/services/state manager/user-ngrx.service';

@Component({
  selector: 'app-delete-user-mod',
  templateUrl: './delete-user-mod.component.html',
  styleUrls: ['./delete-user-mod.component.css'],
})
export class DeleteUserModComponent implements OnInit {
  constructor(
    private authProxyS: AuthProxyService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router,
    private loginoutEmitter: LoginLogoutEmitterService,
    private userNgRxS: UserNgrxService
  ) {}

  ngOnInit(): void {}

  deleteUser() {
    this.authProxyS.deleteUser().subscribe((response) => {
      localStorage.removeItem('jwt');
      this.userNgRxS.deleteUserData();
      this.loginoutEmitter.loginlogoutEmitter.emit(false);
      this.snackBar.open('User Has Been Deleted Successfully!', 'Ok!');
      this.router.navigate(['login']);
      this.dialog.closeAll();
    });
  }
}
