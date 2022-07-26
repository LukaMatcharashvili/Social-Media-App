import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardReverseService } from './guards/auth-guard-reverse.service';
import { AuthGuardService } from './guards/auth-guard.service';
import { FeedPgComponent } from './view/feed-pg/feed-pg.component';
import { LoginPgComponent } from './view/login-pg/login-pg.component';
import { FollowerPgComponent } from './view/profile-pg/follower-pg/follower-pg.component';
import { FollowingPgComponent } from './view/profile-pg/following-pg/following-pg.component';
import { PostPgComponent } from './view/profile-pg/post-pg/post-pg.component';
import { ProfilePgComponent } from './view/profile-pg/profile-pg.component';
import { RegisterPgComponent } from './view/register-pg/register-pg.component';
import { ResetPasswordPgComponent } from './view/reset-password-pg/reset-password-pg.component';
import { SearchPgComponent } from './view/search-pg/search-pg.component';
import { SearchPostPgComponent } from './view/search-pg/search-post-pg/search-post-pg.component';
import { SearchUserPgComponent } from './view/search-pg/search-user-pg/search-user-pg.component';
import { SinglePostPgComponent } from './view/single-post-pg/single-post-pg.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuardReverseService],
    component: RegisterPgComponent,
  },
  {
    path: 'login',
    canActivate: [AuthGuardReverseService],
    component: LoginPgComponent,
  },
  {
    path: 'profile/:userId',
    canActivate: [AuthGuardService],
    component: ProfilePgComponent,
    children: [
      { path: '', redirectTo: 'posts', pathMatch: 'full' },
      { path: 'posts', component: PostPgComponent },
      { path: 'followers', component: FollowerPgComponent },
      { path: 'followings', component: FollowingPgComponent },
    ],
  },
  {
    path: 'resetpassword/:userId/:resetToken',
    canActivate: [AuthGuardReverseService],
    component: ResetPasswordPgComponent,
  },
  {
    path: 'feed',
    canActivate: [AuthGuardService],
    component: FeedPgComponent,
  },
  {
    path: 'post/:postId',
    canActivate: [AuthGuardService],
    component: SinglePostPgComponent,
  },
  {
    path: 'search',
    canActivate: [AuthGuardService],
    component: SearchPgComponent,
    children: [
      { path: '', redirectTo: 'posts', pathMatch: 'full' },
      { path: 'posts', component: SearchPostPgComponent },
      { path: 'users', component: SearchUserPgComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
