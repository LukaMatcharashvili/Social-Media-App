import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { PostProxyService } from 'src/app/services/proxy/post-proxy.service';
import { SearchProxyService } from 'src/app/services/proxy/search-proxy.service';
import { UserNgrxService } from 'src/app/services/state manager/user-ngrx.service';
import { AddNewPostModComponent } from '../../add-new-post-mod/add-new-post-mod.component';
import { DeletePostModComponent } from '../../delete-post-mod/delete-post-mod.component';
import { LikesListModComponent } from '../../likes-list-mod/likes-list-mod.component';
import { UpdatePostModComponent } from '../../update-post-mod/update-post-mod.component';

@Component({
  selector: 'app-search-post-pg',
  templateUrl: './search-post-pg.component.html',
  styleUrls: ['./search-post-pg.component.css'],
})
export class SearchPostPgComponent implements OnInit {
  searchBody: string = '';
  regUser: any = {};
  posts: any = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private searchProxyS: SearchProxyService,
    private userNgRxS: UserNgrxService,
    private dialog: MatDialog,
    private postProxyS: PostProxyService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((qParams: any) => {
      this.searchUser(qParams.searchBody);
      this.getRegisteredUser();
    });
  }

  searchUser(searchBody: string) {
    this.searchProxyS.getPostSearch(searchBody).subscribe((response: any) => {
      this.posts = response;
    });
  }

  getRegisteredUser() {
    this.userNgRxS.getUserData().subscribe((user: any) => {
      this.regUser = user;
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
        response.author._id = this.regUser._id;
        response.author.username = this.regUser.username;
        response.author.profilePic = this.regUser.profilePic;
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
        this.posts[postIndex].likes.push(this.regUser._id);
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
