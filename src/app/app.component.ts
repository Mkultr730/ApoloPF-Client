import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ApoloPF-Client';
  user;

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.user = this.auth.getLoggedUser();
    (() => {
      'use strict';
      // ENABLE sidebar menu tabs
      $('.js-sidebar-mini-tabs [data-toggle="tab"]').on('click', function(e) {
        e.preventDefault();
        $(this).tab('show');
      });
      $('.js-sidebar-mini-tabs').on('show.bs.tab', (e) => {
          $('.js-sidebar-mini-tabs > .active').removeClass('active');
          $(e.target).parent().addClass('active');
        });
    })();
  }
}
