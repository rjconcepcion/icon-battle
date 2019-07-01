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
    const url = `${environment.endpoint}player?q={"username":"${username.trim()}"}`;
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

  updateCreator (_id : string, player : Player): Observable<Player[]>{    
    const url = `${environment.endpoint}player/${_id}`;
    console.log(url);
    console.log('player',player);
    return this.http.put(url, player, httpOptions);
  }

}
