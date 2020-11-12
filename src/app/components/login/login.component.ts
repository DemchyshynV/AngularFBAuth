import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthService} from '../../services';
import {Router} from '@angular/router';
import {SocialAuthService, SocialUser} from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  user: SocialUser;

  // loggedIn: boolean;

  constructor(private authService: AuthService, private router: Router, private socialAuthService: SocialAuthService) {
  }

  ngOnInit(): void {
    this.authService.deleteTokens();
    // console.log(this.socialAuthService.signOut());
    this.form = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    });
    // this.authService1.initState.subscribe(value => console.log(value));
  }

  login(form: FormGroup): void {
    this.authService.login(form.getRawValue()).subscribe(() => this.router.navigate(['user']));

  }

  loginFB(): void {
    this.authService.loginToFB().subscribe(() => this.router.navigate(['user']));
  }
}
