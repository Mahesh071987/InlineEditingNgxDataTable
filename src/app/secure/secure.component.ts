import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrls: ['./secure.component.scss']
})
export class SecureComponent implements OnInit {
  isUserActivated = false;

  constructor( private router : Router) {

  }
  show: boolean = true;
  ngOnInit() {

  }

}
