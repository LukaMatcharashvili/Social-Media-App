import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PostAddEmitterService } from 'src/app/services/emitters/post-add-emitter.service';
import { PostProxyService } from 'src/app/services/proxy/post-proxy.service';

@Component({
  selector: 'app-delete-post-mod',
  templateUrl: './delete-post-mod.component.html',
  styleUrls: ['./delete-post-mod.component.css'],
})
export class DeletePostModComponent implements OnInit {
  constructor(
    private postProxyS: PostProxyService,
    private dialog: MatDialog,
    private postAddEmitter: PostAddEmitterService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  deletePost() {
    this.postProxyS.deletePost(this.data.postId).subscribe((response) => {
      this.postAddEmitter.postAddEmitter.emit(true);
      this.dialog.closeAll();
    });
  }
}
