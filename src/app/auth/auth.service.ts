import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, catchError, tap, throwError } from 'rxjs';
import { User } from './user.model';

export interface AuthResponseData {
  kind: string,
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered?: boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<User|null>(null);

  constructor(private http: HttpClient) { }

  signUp(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAyhyI9Mx6r3tOsQIhoWZeMk5RjWJQnscE",
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(response => {
          this.handleAuth(response.email, response.localId, response.idToken, +response.expiresIn)
        })
      );
  }

  signIn(email: string, password: string){
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAyhyI9Mx6r3tOsQIhoWZeMk5RjWJQnscE',
      {
        email,
        password,
        returnSecureToken: true,
      })
      .pipe(
        catchError(this.handleError),
        tap(response => {
          this.handleAuth(response.email, response.localId, response.idToken, +response.expiresIn)
        })        
        );
  }


  private handleAuth(email: string, localId: string, idToken: string, expiresIn: number){
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000)
    const user = new User(email, localId, idToken, expirationDate);
    this.user.next(user);
  }

  private handleError(errorResponse : HttpErrorResponse){
    let errorMessage = "An error occurred";
    console.log(errorResponse)

    switch (errorResponse.error.error.message) {
      case "EMAIL_EXISTS":
        errorMessage = "This email is already registered";
        break;
      case "EMAIL_NOT_FOUND":
        errorMessage = "Invalid credentials";
        break;
      case "INVALID_PASSWORD":
        errorMessage = "Invalid credentials";
        break;
      default :
        errorMessage = "An error occurred";
    }
    return throwError(() => new Error(errorMessage));
  }
}
