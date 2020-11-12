import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IFBToken, ILogin, IToken} from '../interfaces';
import {from, Observable} from 'rxjs';
import {switchMap, tap} from 'rxjs/operators';
import {FacebookLoginProvider, SocialAuthService, SocialUser} from 'angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private accessTokenKey = 'access';
  private refreshTokenKey = 'refresh';

  constructor(private httpClient: HttpClient, private socialAuthService: SocialAuthService) {
  }

  login(user: ILogin): Observable<IToken> {
    return this.httpClient.post<IToken>('http://localhost:8000/api/token/', user)
      .pipe(
        tap((tokens: IToken) => this.setTokens(tokens))
      );
  }

  loginToFB(): Observable<IFBToken> {
    return from(this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID)).pipe(switchMap(value => {
      return this.httpClient.post<IFBToken>(`http://localhost:8000/auth/convert-token/`, {
        token: value.authToken,
        grant_type: 'convert_token',
        client_id: 'g33ko6wfes8PzLu67p1RP0AQd7o2beAaDp1kLeWQ',
        backend: 'facebook'
      }).pipe(tap((tokens) => this.setFBTokens(tokens)));
    }));
  }

  private setAccessToken(access: string): void {
    localStorage.setItem(this.accessTokenKey, access);
  }

  private setRefreshToken(refresh: string): void {
    localStorage.setItem(this.refreshTokenKey, refresh);
  }

  private setFBAccessToken(access: string): void {
    localStorage.setItem(this.accessTokenKey + 'FB', access);
  }

  private setFBRefreshToken(refresh: string): void {
    localStorage.setItem(this.refreshTokenKey + 'FB', refresh);
  }

  getAccessToken(): string {
    return localStorage.getItem(this.accessTokenKey);
  }

  getFBAccessToken(): string {
    return localStorage.getItem(this.accessTokenKey + 'FB');
  }

  getRefreshToken(): string {
    return localStorage.getItem(this.refreshTokenKey);
  }

  deleteTokens(): void {
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    localStorage.removeItem(this.accessTokenKey + 'FB');
    localStorage.removeItem(this.refreshTokenKey + 'FB');

  }

  private setTokens(tokens: IToken): void {
    const {access, refresh} = tokens;
    this.setAccessToken(access);
    this.setRefreshToken(refresh);
  }

  private setFBTokens(tokens: IFBToken): void {
    const {access_token, refresh_token} = tokens;
    this.setFBAccessToken(access_token);
    this.setFBRefreshToken(refresh_token);
  }
}
