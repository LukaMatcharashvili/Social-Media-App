import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthProxyService } from 'src/app/services/proxy/auth-proxy.service';

@Component({
  selector: 'app-register-pg',
  templateUrl: './register-pg.component.html',
  styleUrls: ['./register-pg.component.css'],
})
export class RegisterPgComponent implements OnInit {
  hide = true;

  coverPic!: any;
  profilePic!: any;

  constructor(
    private authProxyS: AuthProxyService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

  userForm: FormGroup = new FormGroup({
    username: new FormControl<string | null>(null, Validators.required),
    email: new FormControl<string | null>(null, [
      Validators.required,
      Validators.email,
    ]),
    profilePic: new FormControl<string | null>(null),
    coverPic: new FormControl<string | null>(null),
    password: new FormControl<string | null>(null, Validators.required),
  });

  onImageUpload(event: any, imageField: any) {
    const reader = new FileReader();
    reader.onload = () => {
      if (imageField === 'coverPic') {
        this.coverPic = reader.result;
      } else {
        this.profilePic = reader.result;
      }
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  onFormSubmit() {
    this.userForm.value.profilePic = this.profilePic;
    this.userForm.value.coverPic = this.coverPic;
    this.authProxyS.registerUser(this.userForm.value).subscribe(
      (response) => {
        if (response) {
          this.snackBar.open(
            'Link Has Been Sent On Your Email, You Can Click On It And Email Will Be Verified!',
            'Ok!'
          );
          this.router.navigate(['login']);
        }
      },
      (error) => {
        this.snackBar.open(error.error.message, 'Ok!');
      }
    );
  }
}
