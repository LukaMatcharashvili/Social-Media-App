import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PostProxyService } from 'src/app/services/proxy/post-proxy.service';

@Component({
  selector: 'app-likes-list-mod',
  templateUrl: './likes-list-mod.component.html',
  styleUrls: ['./likes-list-mod.component.css'],
})
export class LikesListModComponent implements OnInit {
  likes!: any[];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private postProxyS: PostProxyService
  ) {}

  ngOnInit(): void {
    this.getLikes();
  }

  getLikes() {
    this.postProxyS.getLikes(this.data.postId).subscribe((response: any) => {
      this.likes = response;
    });
  }
}
