import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Player } from './player';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'x-apikey': '5d0332d327bc5b75bfeb7c08',
  })
};

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private http: HttpClient) { }

  addPlayer (player: Player): Observable<Player> {
    const url = `${environment.endpoint}player`;
    return this.http.post<Player>(url, player, httpOptions);
  }

  findPlayer (username: any): Observable<Player[]>{    
    const url = `${environment.endpoint}player?q={"username":"${username.trim()}"}`;
    return this.http.get<Player[]>(url,httpOptions);
  }

  // searchIcon (term: string): Observable<Player[]>{
    
  //   if (!term.trim()) {
  //     const url = `${environment.endpoint}player`;
  //     return this.http.get<Player[]>(url,httpOptions)
  //   }
    
  //   return this.http.get<Player[]>(url,httpOptions)
  // }

}
