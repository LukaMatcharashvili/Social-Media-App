import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { PostAddEmitterService } from 'src/app/services/emitters/post-add-emitter.service';
import { PostProxyService } from 'src/app/services/proxy/post-proxy.service';
import { UserProxyService } from 'src/app/services/proxy/user-proxy.service';
import { UserNgrxService } from 'src/app/services/state manager/user-ngrx.service';
import { AddNewPostModComponent } from '../../add-new-post-mod/add-new-post-mod.component';
import { DeletePostModComponent } from '../../delete-post-mod/delete-post-mod.component';
import { LikesListModComponent } from '../../likes-list-mod/likes-list-mod.component';
import { UpdatePostModComponent } from '../../update-post-mod/update-post-mod.component';

@Component({
  selector: 'app-post-pg',
  templateUrl: './post-pg.component.html',
  styleUrls: ['./post-pg.component.css'],
})
export class PostPgComponent implements OnInit {
  userData: any = {};
  regUser: any = {};
  posts!: any[];

  constructor(
    private dialog: MatDialog,
    private userNgRxS: UserNgrxService,
    private postProxyS: PostProxyService,
    private postAddEmitter: PostAddEmitterService,
    private activatedRoute: ActivatedRoute,
    private userProxyS: UserProxyService
  ) {}

  ngOnInit(): void {
    this.postAddEmitter.postAddEmitter.subscribe((response) => {
      this.getProfilePost(this.userData._id);
    });
    this.activatedRoute.parent?.params.subscribe((params: any) => {
      this.getRegisteredUser();
      this.getUserProfile(params.userId);
      this.getProfilePost(params.userId);
    });
  }

  getRegisteredUser() {
    this.userNgRxS.getUserData().subscribe((response: any) => {
      this.regUser = response;
    });
  }

  getUserProfile(userId: string) {
    this.userProxyS.getUserById(userId).subscribe((response: any) => {
      const { password, verificationToken, ...user } = response;
      this.userData = user;
    });
  }

  getProfilePost(userId: string) {
    this.postProxyS.getProfilePost(userId).subscribe((posts: any) => {
      this.posts = posts;
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

  onAddNewBtnClick() {
    this.dialog.open(AddNewPostModComponent);
  }

  onPostCommentBtnClick(commentInp: any, postId: string, postIndex: number) {
    this.postProxyS
      .addComment({ content: commentInp.value }, postId)
      .subscribe((response: any) => {
        response.author = {};
        response.author._id = this.userData._id;
        response.author.username = this.userData.username;
        response.author.profilePic = this.userData.profilePic;
        this.posts[postIndex].comments.push(response);
        commentInp.value = '';
      });
  }

  onCommentDelete(commentId: string, commentIndex: number, postIndex: number) {
    this.postProxyS.deleteComment(commentId).subscribe((response: any) => {
      if (response) {
        this.posts[postIndex].comments.splice(commentIndex, 1);
      }
    });
  }

  onLike(postId: string, postIndex: number) {
    this.postProxyS.like(postId).subscribe((response: any) => {
      if (response) {
        this.posts[postIndex].likes.push(this.userData._id);
      }
    });
  }

  onUnlike(postId: string, postIndex: number) {
    this.postProxyS.unlike(postId).subscribe((response: any) => {
      if (response) {
        this.posts[postIndex] = response;
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
