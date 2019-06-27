import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


const httpOptions = {
  headers: new HttpHeaders({
    
    'Content-Type': 'application/json',
    'x-apikey': '5d0332d327bc5b75bfeb7c08',
    
  })
};

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  addCreator (creator: Creator): Observable<Creator> {
    const url = `${environment.endpoint}player`;
    return this.http.post<Creator>(url, creator, httpOptions);
  }

}