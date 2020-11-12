import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {IUser} from '../../interfaces';
import {SocialAuthService} from 'angularx-social-login';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: IUser;

  constructor(private userService: UserService, private socialAuthService: SocialAuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.userService.getUserInfo().subscribe(value => this.user = value);
  }

  logOut(): void {
    this.socialAuthService.signOut().then(value => this.router.navigate(['login']));
  }
}
