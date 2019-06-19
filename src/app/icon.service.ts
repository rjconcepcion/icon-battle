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
    const url = `${environment.endpoint}icon-list?`;
    return this.http.get<Icon[]>(url,httpOptions)
  } 

  nextIcons (): Observable<Icon[]> {
    const url = `${environment.endpoint}icon-list?&max=1&skip=0`;
    return this.http.get<Icon[]>(url,httpOptions)
  }  

  searchIcon (term: string): Observable<Icon[]>{
    
    if (!term.trim()) {
      const url = `${environment.endpoint}icon-list`;
      return this.http.get<Icon[]>(url,httpOptions)
    }
    const url = `${environment.endpoint}icon-list?q={"name":{"$regex" : "${term.trim()}"}}`;
    return this.http.get<Icon[]>(url,httpOptions)
  }

  addIcon (icon: Icon): Observable<Icon> {
    const url = `${environment.endpoint}icon-list`;
    return this.http.post<Icon>(url, icon, httpOptions);
  }

  deleteIcon (icon: Icon | string): Observable<Icon> {
    const id = typeof icon === 'string' ? icon : icon._id;
    const url = `${environment.endpoint}icon-list/${id}`;
    return this.http.delete<Icon>(url, httpOptions);
  }

  rand ( min : number,max : number):  number {
    return Math.floor(Math.random()*(max-min+1)+min);
  }
}
