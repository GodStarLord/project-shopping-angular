import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private URL =
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDEZIrEeJ8QN-djo6fEXidcUmnX4afnMpU';

  constructor(private http: HttpClient) {}

  singUp(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(this.URL, {
      email: email,
      password: password,
      returnSecureToken: true,
    });
  }
}
