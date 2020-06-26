import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from  'rxjs/operators';
import { Storage } from '@ionic/storage';
import { User } from './user';
import { AuthResponse } from './auth-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  AUTH_SERVER_ADDRESS:  string  =  'http://localhost:3000';
  register_api: string = `${this.AUTH_SERVER_ADDRESS}/register`
  authSubject  =  new  BehaviorSubject(false);

  url : string = "https://api.openweathermap.org/data/2.5/weather?"

  
  constructor( private httpClient: HttpClient, private storage: Storage) { }

  register(user: User): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${this.register_api}`, user).pipe(
      tap(async (res:  AuthResponse ) => {

        if (res.user) {
          await this.storage.set("ACCESS_TOKEN", res.user.access_token);
          await this.storage.set("EXPIRES_IN", res.user.expires_in);
          this.authSubject.next(true);
        }
      })
    );
  }
 
  login(user: User): Observable<AuthResponse> {
    return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/login`, user).pipe(
      tap(async (res: AuthResponse) => {

        if (res.user) {
          await this.storage.set("ACCESS_TOKEN", res.user.access_token);
          await this.storage.set("EXPIRES_IN", res.user.expires_in);
          this.authSubject.next(true);
        }
      })
    );
  }

  async logout() {
    await this.storage.remove("ACCESS_TOKEN");
    await this.storage.remove("EXPIRES_IN");
    this.authSubject.next(false);
  }

  isLoggedIn() {
    return this.authSubject.asObservable();
  }

  getWeatherByZipCodeCounty(city:string,country:string){
    return this.httpClient.get<any>(`${this.url}q=${city},${country}&units=metric&appid=${this.key}`)
  }

  getWeatherByLonLat(lat:number,lon:number){
    return this.httpClient.get<any>(`${this.url}lat=${lat}&lon=${lon}&units=metric&appid=${this.key}`)
  }
}
