import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthProxyService } from 'src/app/services/proxy/auth-proxy.service';

@Component({
  selector: 'app-forgot-password-mod',
  templateUrl: './forgot-password-mod.component.html',
  styleUrls: ['./forgot-password-mod.component.css'],
})
export class ForgotPasswordModComponent implements OnInit {
  email!: any;
  constructor(
    private authProxyS: AuthProxyService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  onFormSubmit() {
    this.authProxyS.sendPasswordResetLink(this.email).subscribe(
      (response: any) => {
        this.snackBar.open(response.message, 'Ok!');
        this.dialog.closeAll();
      },
      (error) => {
        this.snackBar.open(error.error.message, 'Ok!');
      }
    );
  }
}
