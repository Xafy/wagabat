import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

interface AuthResponseData {
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
      .pipe(catchError(this.handleError));
  }

  signIn(email: string, password: string){
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAyhyI9Mx6r3tOsQIhoWZeMk5RjWJQnscE',
      {
        email,
        password,
        returnSecureToken: true,
      })
      .pipe(catchError(this.handleError));
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
      default :
        errorMessage = "An error occurred";
    }
    return throwError(() => new Error(errorMessage));
  }
}
