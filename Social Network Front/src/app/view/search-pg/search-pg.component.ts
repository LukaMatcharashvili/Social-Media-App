import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-search-pg',
  templateUrl: './search-pg.component.html',
  styleUrls: ['./search-pg.component.css'],
})
export class SearchPgComponent implements OnInit {
  currentRoute: any = '';
  searchBody: string = '';
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}
  ngOnInit(): void {
    this.currentRoute = this.router.url;
    this.router.events.subscribe((val: any) => {
      if (val instanceof NavigationEnd) {
        this.currentRoute = val.urlAfterRedirects;
      }
    });
    this.activatedRoute.queryParams.subscribe((qParams: any) => {
      this.searchBody = qParams.searchBody;
    });
  }
}
