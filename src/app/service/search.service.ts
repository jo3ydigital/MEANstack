import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  baseUri:string = 'http://192.168.0.7:4000/api'; //baseUri:string = 'http://localhost:4000/api';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  // Search terms (fired on keyup event from search input)
  searchUser(send_data): Observable<any> {
    return send_data
    .pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(send_data => this.searchEntries(send_data)))
  };

  // Search Service
  searchEntries(send_data) {
    let url = `${this.baseUri}/search`;
    let body = send_data;
    return this.http.post(url, body);
  }

  // Error handling 
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
  
}
