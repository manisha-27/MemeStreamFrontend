import { Injectable, Optional } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable,  throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { MemeRestAPI } from './memerest';

@Injectable({
  providedIn: 'root'
})
export class MemedataService {

  memeurl: string= 'https://charming-peace-production.up.railway.app/meme';
  
  constructor(private httpservice: HttpClient) { }

  myData(){
    return 'Data from MemeStore';
  }

  GetMemeAPI(): Observable<MemeRestAPI>{
    return this.httpservice.get<MemeRestAPI>(this.memeurl+'/findAll');
    // .pipe( retry(1), catchError(this.myerrorhandler));
  }

  GetMemeById(id: number, data: any): Observable<MemeRestAPI>{
    console.log(this.memeurl+"/"+id);
    return this.httpservice.put<MemeRestAPI>(this.memeurl+"/"+id, data);
    // .pipe( retry(1), catchError(this.myerrorhandler));
  }

  // GetBySearch(value: string): Observable<MemeRestAPI>{
  //   return this.httpservice.get<MemeRestAPI>(this.memeurl+"/search/"+value);
  // }

  DeleteMeme(id: string): any{
    return this.httpservice.delete(this.memeurl+'/'+id, {responseType: 'text'});
  }

  public postMeme(data: any): Observable<object>{
    return this.httpservice.post(this.memeurl+"/save", data);
  }

  // private myerrorhandler(error: HttpErrorResponse) {
  //   if (error.status === 0) { // if network issue
  //     // A client-side or network error occurred. Handle it accordingly.
  //     console.error('An error occurred.. either client side or network:', error.error);
  //   } else {
  //     // The backend returned an unsuccessful response code.
  //     // The response body may contain clues as to what went wrong.
  //     console.error(
  //       `Backend returned code ${error.status}, body was: `, error.error);
  //   }
  //   // Return an observable with a user-facing error message.
  //   return throwError(() => new Error('Something bad happened; please try again later.'));
  // }
}
