import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { PostProxyService } from 'src/app/services/proxy/post-proxy.service';
import { UserNgrxService } from 'src/app/services/state manager/user-ngrx.service';
import { DeletePostModComponent } from '../delete-post-mod/delete-post-mod.component';
import { LikesListModComponent } from '../likes-list-mod/likes-list-mod.component';
import { UpdatePostModComponent } from '../update-post-mod/update-post-mod.component';

@Component({
  selector: 'app-single-post-pg',
  templateUrl: './single-post-pg.component.html',
  styleUrls: ['./single-post-pg.component.css'],
})
export class SinglePostPgComponent implements OnInit {
  userData: any = {};
  post: any = {};

  constructor(
    private dialog: MatDialog,
    private userNgRxS: UserNgrxService,
    private postProxyS: PostProxyService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: any) => {
      this.getRegisteredUser();
      this.getPost(params.postId);
    });
  }

  getRegisteredUser() {
    this.userNgRxS.getUserData().subscribe((response: any) => {
      this.userData = response;
    });
  }

  getPost(postId: string) {
    this.postProxyS.getPost(postId).subscribe((response: any) => {
      this.post = response;
    });
  }

  onCommentBtnClick(commentsBox: HTMLDivElement) {
    if (commentsBox.style.display === 'flex') {
      commentsBox.style.display = 'none';
    } else {
      commentsBox.style.display = 'flex';
    }
  }

  onInp(commentInp: any) {}

  onPostCommentBtnClick(commentInp: any, postId: string) {
    this.postProxyS
      .addComment({ content: commentInp.value }, postId)
      .subscribe((response: any) => {
        response.author = {};
        response.author._id = this.userData._id;
        response.author.username = this.userData.username;
        response.author.profilePic = this.userData.profilePic;
        this.post.comments.push(response);
        commentInp.value = '';
      });
  }

  onCommentDelete(commentId: string, commentIndex: number) {
    this.postProxyS.deleteComment(commentId).subscribe((response: any) => {
      if (response) {
        this.post.comments.splice(commentIndex, 1);
      }
    });
  }

  onLike(postId: string) {
    this.postProxyS.like(postId).subscribe((response: any) => {
      if (response) {
        this.post.likes.push(this.userData._id);
      }
    });
  }

  onUnlike(postId: string) {
    this.postProxyS.unlike(postId).subscribe((response: any) => {
      if (response) {
        this.post = response;
      }
    });
  }

  onPostDeleteBtnClick(postId: string) {
    this.dialog.open(DeletePostModComponent, {
      data: {
        postId: postId,
      },
    });
  }

  onPostUpdateBtnClick(postId: string) {
    this.dialog.open(UpdatePostModComponent, {
      data: {
        postId: postId,
      },
    });
  }

  onLikesListBtnClick(postId: string) {
    this.dialog.open(LikesListModComponent, {
      data: {
        postId: postId,
      },
    });
  }
}
