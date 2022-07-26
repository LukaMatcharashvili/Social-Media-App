import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgMaterialModule } from './ng-material.module';
import { DeleteUserModComponent } from './view/delete-user-mod/delete-user-mod.component';
import { ForgotPasswordModComponent } from './view/forgot-password-mod/forgot-password-mod.component';
import { LoginPgComponent } from './view/login-pg/login-pg.component';
import { RegisterPgComponent } from './view/register-pg/register-pg.component';
import { ResetPasswordPgComponent } from './view/reset-password-pg/reset-password-pg.component';
import { UpdateUserModComponent } from './view/update-user-mod/update-user-mod.component';
import { ProfilePgComponent } from './view/profile-pg/profile-pg.component';
import { FeedPgComponent } from './view/feed-pg/feed-pg.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FollowerPgComponent } from './view/profile-pg/follower-pg/follower-pg.component';
import { FollowingPgComponent } from './view/profile-pg/following-pg/following-pg.component';
import { PostPgComponent } from './view/profile-pg/post-pg/post-pg.component';
import { AddNewPostModComponent } from './view/add-new-post-mod/add-new-post-mod.component';
import { ActionReducer, StoreModule } from '@ngrx/store';
import { UserReducer } from './ngrx/reducer/user.reducer';
import { DeletePostModComponent } from './view/delete-post-mod/delete-post-mod.component';
import { UpdatePostModComponent } from './view/update-post-mod/update-post-mod.component';
import { LikesListModComponent } from './view/likes-list-mod/likes-list-mod.component';
import { SearchPgComponent } from './view/search-pg/search-pg.component';
import { SearchPostPgComponent } from './view/search-pg/search-post-pg/search-post-pg.component';
import { SearchUserPgComponent } from './view/search-pg/search-user-pg/search-user-pg.component';
import { SinglePostPgComponent } from './view/single-post-pg/single-post-pg.component';
import { LoaderInterceptorService } from './interceptors/loader-interceptor.service';
import { LoadingService } from './interceptors/loading.service';

@NgModule({
  declarations: [
    AppComponent,
    DeleteUserModComponent,
    ForgotPasswordModComponent,
    LoginPgComponent,
    RegisterPgComponent,
    ResetPasswordPgComponent,
    UpdateUserModComponent,
    ProfilePgComponent,
    FeedPgComponent,
    FollowerPgComponent,
    FollowingPgComponent,
    PostPgComponent,
    AddNewPostModComponent,
    DeletePostModComponent,
    UpdatePostModComponent,
    LikesListModComponent,
    SearchPgComponent,
    SearchPostPgComponent,
    SearchUserPgComponent,
    SinglePostPgComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot({
      user: UserReducer.Reduce as ActionReducer<any>,
    }),
  ],
  providers: [
    LoadingService,
    LoaderInterceptorService,
    {
      useClass: LoaderInterceptorService,
      provide: HTTP_INTERCEPTORS,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
