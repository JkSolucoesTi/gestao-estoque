import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProdutoSignature } from '../model/signature/produtoSignature';
import { Observable } from 'rxjs';
import { EstoqueResponse } from '../model/response/estoqueResponse';

@Injectable({
  providedIn: 'root'
})
export class EstoqueService {

  private servidor : string = "https://localhost:7060/api/"
  private controller : string ="Estoque/";
  private metodoIncluir : string ="IncluirProduto";
  private metodoObter : string = "ObterProdutos";
  private metodoObterPorId : string = "ObterProdutoPorId"
  private metodoAtualizar : string = "AtualizarProduto";
  private metodoExcluir : string = "ExcluirProduto"

  private url : string = "http://localhost:3000/estoque"

  constructor(private httpClient : HttpClient) { }

  Obter() : Observable<EstoqueResponse[]>{
    const url = `${this.servidor}${this.controller}${this.metodoObter}`;
    return this.httpClient.get<EstoqueResponse[]>(url)
  }

  ObterPorCodigo(codigo : number) : Observable<EstoqueResponse>{
    const url = `${this.servidor}${this.controller}${this.metodoObterPorId}?produtoId=${codigo}`;
    return this.httpClient.get<EstoqueResponse>(url);
  }

  Atualizar(produtoSignature:ProdutoSignature): Observable<any>{   
    const url = `${this.servidor}${this.controller}${this.metodoAtualizar}`;
    return this.httpClient.post<any>(url,produtoSignature)
  }

  Incluir(produtoSignature:ProdutoSignature) : Observable<any>{   
    const url = `${this.servidor}${this.controller}${this.metodoIncluir}`;
    return this.httpClient.post<any>(url,produtoSignature)
  }

  Excluir(produtoId:number):Observable<any>{
    const url = `${this.servidor}${this.controller}${this.metodoExcluir}?produtoId=${produtoId}`;
    return this.httpClient.delete<any>(url)  
  }
}
