import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FornecedorSignature } from '../model/signature/fornecedorSignature';
import { Observable } from 'rxjs';
import { FornecedorResponse } from '../model/response/fornecedorResponse';

@Injectable({
  providedIn: 'root'
})
export class FornecedorService {

  
  private servidor : string = "https://localhost:7060/api/"
  private controller : string ="Fornecedor/";
  private metodo : string ="IncluirFornecedor";
  private metodoObter : string = "ObterFornecedores";
  private metodoObterPorId : string = "ObterFornecedorPorId";
  private metodoAtualizar : string = "AtualizarFornecedor";

  private url : string = "http://localhost:3000/fornecedor"

  constructor(private httpClient : HttpClient) { }

  Obter() : Observable<FornecedorResponse[]>{
    const url = `${this.servidor}${this.controller}${this.metodoObter}`;
    return this.httpClient.get<FornecedorResponse[]>(url);
  }

  ObterPorCodigo(fornecedorId : number) : Observable<FornecedorResponse>{
    let url = `${this.servidor}${this.controller}${this.metodoObterPorId}?fornecedorId=${fornecedorId}`
   return this.httpClient.get<FornecedorResponse>(url);
  }

  Atualizar(fornecedorSignature:FornecedorSignature){   
    const url = `${this.servidor}${this.controller}${this.metodoAtualizar}`;
    return this.httpClient.post<FornecedorSignature>(url,fornecedorSignature)
  }

  Incluir(fornecedorSignature:FornecedorSignature) : Observable<any>{   
  const url = `${this.servidor}${this.controller}${this.metodo}`
  return this.httpClient.post<any>(url,fornecedorSignature)
  }
}
