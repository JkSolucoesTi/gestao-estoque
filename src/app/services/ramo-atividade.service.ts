import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RamoAtividadeResponse } from '../model/response/ramoAtividadeResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RamoAtividadeService {

  private url : string = "https://localhost:7060/api/RamoAtividade/ObterRamoAtividade"

  constructor(private httpClient : HttpClient) { }

  Obter() : Observable<RamoAtividadeResponse[]>{
    return this.httpClient.get<RamoAtividadeResponse[]>(this.url)
  }

}
