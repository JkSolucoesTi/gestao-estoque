import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginSignature } from '../model/signature/loginSignature';
import { LoginResponse } from '../model/response/loginResponse';
import { Observable, delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url : string = 'https://localhost:7060/api/Autenticacao/Login';

  constructor(private httpClient : HttpClient) { }


  Login(loginSignature:LoginSignature) : Observable<any>{
   let parametros = `${this.url}`;
  return this.httpClient.post<any>(parametros,loginSignature).pipe(
    delay(2000)
  )
  }
}
