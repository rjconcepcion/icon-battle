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
export class BattleService {

  constructor(private http: HttpClient) { }

  enemiesList (): Observable<Icon[]> {
    const url = `${environment.endpoint}icon-list?q={"fake_id": {"$not": 97}}`;
    return this.http.get<Icon[]>(url,httpOptions)
  } 


}
