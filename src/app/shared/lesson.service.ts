import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {tap} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    Accept: 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class LessonService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getLesson(request){
    const url = `${this.apiUrl}getCrenaux`;
    return this.http.post(url, request, httpOptions)
        .pipe(
            tap(data => console.log()
            )
        );
  }
}
