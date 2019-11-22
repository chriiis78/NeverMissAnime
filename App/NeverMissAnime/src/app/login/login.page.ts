import { Component, OnInit } from '@angular/core';

import { GoogleService } from "../services/google.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  ngOnInit() {
  }

  constructor(private googleService: GoogleService) {
  }

  googleLogin() {
      this.googleService.nativeGoogleLogin();
  }

  login() {
    this.googleService.googleLogin();
  }
}
