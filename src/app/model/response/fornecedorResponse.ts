import { Endereco } from "../endereco";
import { Ramo } from "../ramo";
import { Responsavel } from "../responsavel";

export class FornecedorResponse{

    constructor(){
        this.id = 0;
        this.razaoSocial = "";
        this.cnpj = "";
        this.ie ="";
    }
    id: number;
    razaoSocial : string;
    cnpj:string;
    ie:string;
    idRamoAtividade: number;
    rua:string;
    cep: string;
    bairro: string;
    cidade: string;
    estado: string;
    nome: string;
    funcao: string;
    email: string;

}