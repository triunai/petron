import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { General_Config } from './General_Config';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  constructor(private http: HttpClient) { }

  // Http Options
  httpOptions() {
    return {
      headers: new HttpHeaders({
        'Authorization': 'jwt ' + window.localStorage.getItem(General_Config.session_key + 'token')
      })
    }
  }

  // HttpClient API post() method => Login
  loginUser(user: any): Observable<Response> {
    return this.http.post<Response>(General_Config.api_url + 'userregistration/login', user)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // HttpClient API post() method => Forgot password
  forgotPassword(user: any): Observable<Response> {
    return this.http.post<Response>(General_Config.api_url + 'reset_password_request_admin', user)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // HttpClient API post() method => Reset password
  resetPassword(user: any): Observable<Response> {
    return this.http.post<Response>(General_Config.api_url + 'change_staff_password', user)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // HttpClient API put() method => DELETE
  del(path: string): Observable<Response> {
    return this.http.delete<Response>(General_Config.api_url + path, { headers: this.httpOptions().headers })
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // HttpClient API put() method => PUT
  put(path: string, data: any): Observable<Response> {
    return this.http.put<Response>(General_Config.api_url + path, data, { headers: this.httpOptions().headers })
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // HttpClient API put() method => POST
  post(path: string, data: any): Observable<Response> {
    return this.http.post<Response>(General_Config.api_url + path, data, { headers: this.httpOptions().headers })
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // HttpClient API put() method => GET
  get(path: string): Observable<Response> {
    return this.http.get<Response>(General_Config.api_url + path, { headers: this.httpOptions().headers })
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // Error handling 
  handleError(error: { error: { message: string; }; }) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `${error.error.message}`;
    }
    return throwError(errorMessage);
  }
}
