import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthProxyService } from 'src/app/services/proxy/auth-proxy.service';

@Component({
  selector: 'app-reset-password-pg',
  templateUrl: './reset-password-pg.component.html',
  styleUrls: ['./reset-password-pg.component.css'],
})
export class ResetPasswordPgComponent implements OnInit {
  hide = true;

  password!: string;
  confirmPassword!: string;

  resetToken!: string;
  userId!: string;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authProxyS: AuthProxyService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: any) => {
      this.resetToken = params.resetToken;
      this.userId = params.userId;
    });
  }

  onFormSubmit() {
    this.authProxyS
      .resetPassword(this.userId, this.resetToken, {
        password: this.password,
        confirmPassword: this.confirmPassword,
      })
      .subscribe(
        (response: any) => {
          this.snackBar.open(response.message, 'Ok!');
          this.router.navigate(['login']);
        },
        (error: any) => {
          this.snackBar.open(error.error.message, 'Ok!');
        }
      );
  }
}
