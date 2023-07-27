import {Injectable} from '@angular/core';
import { HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import {throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthHeader {
  constructor() { }
  setHeaders() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.getJwtToken()
    });
    return {headers: headers};
  }

  getJwtToken() {
    return JSON.parse(<string>localStorage.getItem('user-details')).token
  }

  errorHandler(error: HttpErrorResponse) {
    if (error.error) {
      const err = error.error.message;
      return throwError(err)
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}
