import { Component, OnInit } from '@angular/core';
import { ScrollAutoService } from './services/scroll-auto.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{  

  constructor(private _scrollSevice: ScrollAutoService) { }

  ngOnInit() {
    this._scrollSevice.setScrollTop();
  }
}
