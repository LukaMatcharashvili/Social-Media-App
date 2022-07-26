import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginLogoutEmitterService } from 'src/app/services/emitters/login-logout-emitter.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { AuthProxyService } from 'src/app/services/proxy/auth-proxy.service';
import { UserNgrxService } from 'src/app/services/state manager/user-ngrx.service';
import { ForgotPasswordModComponent } from '../forgot-password-mod/forgot-password-mod.component';

@Component({
  selector: 'app-login-pg',
  templateUrl: './login-pg.component.html',
  styleUrls: ['./login-pg.component.css'],
})
export class LoginPgComponent implements OnInit {
  hide = true;

  constructor(
    private authProxyS: AuthProxyService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private localStorageS: LocalStorageService,
    private loginoutEmitter: LoginLogoutEmitterService,
    private userNgRxS: UserNgrxService
  ) {}

  ngOnInit(): void {}

  userForm: FormGroup = new FormGroup({
    email: new FormControl<string | null>(null, [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl<string | null>(null, Validators.required),
  });

  onFormSubmit() {
    this.authProxyS.loginUser(this.userForm.value).subscribe(
      (response: any) => {
        this.localStorageS.setWithExpiry(
          'jwt',
          response.access_token,
          86400000
        );
        this.authProxyS.whoami().subscribe((user: any) => {
          const { verificationToken, ...restUser } = user;
          this.userNgRxS.addUserData(restUser);
          this.loginoutEmitter.loginlogoutEmitter.emit(true);
          this.snackBar.open('Logged In Successfully!', 'Ok!');
          this.router.navigate(['feed']);
        });
      },
      (error) => {
        this.snackBar.open(error.error.message, 'Ok!');
      }
    );
  }

  onForgotPasswordBtnClick() {
    this.dialog.open(ForgotPasswordModComponent);
  }
}
