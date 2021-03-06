import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Player } from './player';
import { CookieService } from 'ngx-cookie-service';

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

  constructor(private http: HttpClient,private cookieService: CookieService, ) { }

  addPlayer (player: Player): Observable<Player> {
    const url = `${environment.endpoint}player`;
    return this.http.post<Player>(url, player, httpOptions);
  }

  findPlayer (username: any): Observable<Player[]>{
    const url = `${environment.endpoint}player?q={"username":"${username}"}`;
    return this.http.get<Player[]>(url,httpOptions);
  }

  getCreator (_id : string): Observable<Player[]>{
    const url = `${environment.endpoint}player/${_id}`;
    return this.http.get<Player[]>(url,httpOptions);
  }

  setCreator (_id : string) {
    this.getCreator(_id).subscribe((response : any)=> {
      this.cookieService.set('creator',JSON.stringify(response));
    })
  }

  setCreatorInCookie (player : Player) {
    this.cookieService.set('creator',JSON.stringify(player));
  }

  playerRank (): Observable<Player[]> {
    const url = `${environment.endpoint}player?max=10&h={"$orderby": {"score": -1}}`;
    return this.http.get<Player[]>(url,httpOptions)
  }

  signIn (username : string, password : string): Observable<Player[]> {
    const url = `${environment.endpoint}player?q={"username":"${username}","password":"${password}"}`;
    return this.http.get<Player[]>(url,httpOptions);
  }

  updateCreator (_id : string, player : Player): Observable<Player[]>{
    const url = `${environment.endpoint}player/${_id}`;
    return this.http.put<Player[]>(url, player, httpOptions);
  }

}
