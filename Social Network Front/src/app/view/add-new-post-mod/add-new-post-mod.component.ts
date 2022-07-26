import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PostAddEmitterService } from 'src/app/services/emitters/post-add-emitter.service';
import { PostProxyService } from 'src/app/services/proxy/post-proxy.service';
import { UserNgrxService } from 'src/app/services/state manager/user-ngrx.service';

@Component({
  selector: 'app-add-new-post-mod',
  templateUrl: './add-new-post-mod.component.html',
  styleUrls: ['./add-new-post-mod.component.css'],
})
export class AddNewPostModComponent implements OnInit {
  userData: any = {};
  uploadedImage!: any;
  content!: string;

  constructor(
    private userNgRxS: UserNgrxService,
    private postProxyS: PostProxyService,
    private postAddEmitter: PostAddEmitterService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getRegisteredUser();
  }

  getRegisteredUser() {
    this.userNgRxS.getUserData().subscribe((response) => {
      this.userData = response;
    });
  }

  onImageUploadBtnClick(imageInp: any) {
    imageInp.click();
  }

  onImageUpload(event: any) {
    const reader = new FileReader();
    reader.onload = () => {
      this.uploadedImage = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
  }

  onSubmit() {
    this.postProxyS
      .addPost({ content: this.content, image: this.uploadedImage })
      .subscribe((response) => {
        if (response) {
          this.postAddEmitter.postAddEmitter.emit(true);
          this.dialog.closeAll();
        }
      });
  }
}
