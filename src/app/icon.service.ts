import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Icon } from './icon';
import { Observable, of } from 'rxjs';
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
export class IconService {

 // private iconUrl = 'https://ngsapp-446e.restdb.io/rest/icon-list';  // URL to web api
  constructor(private http: HttpClient) { }

  getIcons (): Observable<Icon[]> {
    const url = `${environment.endpoint}icon-list`;
    return this.http.get<Icon[]>(url,httpOptions)
  } 

  addIcon (icon: Icon): Observable<Icon> {
    const url = `${environment.endpoint}icon-list`;
    return this.http.post<Icon>(url, icon, httpOptions);
  }

  rand ( min : number,max : number):  number {
    return Math.floor(Math.random()*(max-min+1)+min);
  }
}
