import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PostAddEmitterService } from 'src/app/services/emitters/post-add-emitter.service';
import { PostProxyService } from 'src/app/services/proxy/post-proxy.service';
import { UserNgrxService } from 'src/app/services/state manager/user-ngrx.service';

@Component({
  selector: 'app-update-post-mod',
  templateUrl: './update-post-mod.component.html',
  styleUrls: ['./update-post-mod.component.css'],
})
export class UpdatePostModComponent implements OnInit {
  userData: any = {};
  uploadedImage!: any;
  content!: string;

  constructor(
    private userNgRxS: UserNgrxService,
    private postProxyS: PostProxyService,
    private postAddEmitter: PostAddEmitterService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.getRegisteredUser();
    this.getPostData();
  }

  getPostData() {
    this.postProxyS.getPost(this.data.postId).subscribe((response: any) => {
      this.uploadedImage = response.image;
      this.content = response.content;
    });
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
      .updatePost(this.data.postId, {
        content: this.content,
        image: this.uploadedImage,
      })
      .subscribe((response) => {
        if (response) {
          this.postAddEmitter.postAddEmitter.emit(true);
          this.dialog.closeAll();
        }
      });
  }
}
