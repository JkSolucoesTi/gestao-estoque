import { Endereco } from "./endereco";
import { Ramo } from "./ramo";
import { Responsavel } from "./responsavel";

export class Fornecedor{
    id : number;
    razaoSocial : string;
    cnpj:string;
    inscricaoEstadual:string;
    
    endereco : Endereco;
    ramoDeAtividade: Ramo;
    responsavel:Responsavel;
}