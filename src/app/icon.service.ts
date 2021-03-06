import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Icon } from './icon';
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
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

  constructor(private http: HttpClient) { }

  testing_olny : string = "dark";
  handlerError : any;

  paginateIcons (skip : number): Observable<Icon[]> {
    const url = `${environment.endpoint}icon-list?totals=true&max=${environment.maxIcon}&skip=${skip}&h={"$orderby": {"fake_id": -1}}`;
    return this.http.get<Icon[]>(url,httpOptions)
  }

  getIcons (): Observable<Icon[]> {
    const url = `${environment.endpoint}icon-list?totals=true&max=${environment.maxIcon}&skip=0&h={"$orderby": {"fake_id": -1}}`;
    return this.http.get<Icon[]>(url,httpOptions)
  }

  urll = `${environment.endpoint}icon-list?h={"$orderby": {"fake_id": -1}}`;
  icons$ = this.http.get<Icon[]>(this.urll,httpOptions)
    .pipe(
      tap(console.log),
      catchError(this.handlerError)
    );

  allIcons (): Observable<Icon[]> {
    const url = `${environment.endpoint}icon-list?h={"$orderby": {"fake_id": -1}}`;
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

  searchIconById (fake_id: any): Observable<Icon[]>{

    const url = `${environment.endpoint}icon-list?q={"fake_id":${fake_id}}`;
    return this.http.get<Icon[]>(url,httpOptions)
  }


  searchIconBy (field : string, value : any, dataType : string = "string"): Observable<Icon[]>{
    let url = `${environment.endpoint}icon-list?totals=true&max=${environment.maxIcon}&skip=0&q={"${field}":"${value}"}&h={"$orderby": {"fake_id": -1}}`;
    if(dataType == 'number'){
      url = `${environment.endpoint}icon-list?totals=true&max=${environment.maxIcon}&skip=0&q={"${field}":${value}}&h={"$orderby": {"fake_id": -1}}`;
    }

    return this.http.get<Icon[]>(url,httpOptions)
  }
  paginateIconsBy (field : string, value : any,skip : number): Observable<Icon[]> {
    const url = `${environment.endpoint}icon-list?totals=true&max=${environment.maxIcon}&skip=${skip}&h={"$orderby": {"fake_id": -1}}&q={"${field}":"${value}"}`;
    return this.http.get<Icon[]>(url,httpOptions)
  }

  addIcon (icon: Icon): Observable<Icon> {
    const url = `${environment.endpoint}icon-list`;
    return this.http.post<Icon>(url, icon, httpOptions);
  }

  deleteIcon (icon: Icon | string): Observable<Icon[]> {
    const id = typeof icon === 'string' ? icon : icon._id;
    const url = `${environment.endpoint}icon-list/${id}`;

    return this.http.delete<Icon[]>(url, httpOptions);
  }

  rand ( min : number,max : number):  number {
    return Math.floor(Math.random()*(max-min+1)+min);
  }
}
