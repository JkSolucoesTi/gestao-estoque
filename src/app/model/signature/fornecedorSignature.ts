import { Endereco } from "../endereco";
import { Ramo } from "../ramo";
import { Responsavel } from "../responsavel";

export class FornecedorSignature{

    constructor(){
    }

    id: number;
    razaoSocial : string;
    cnpj:string;
    inscricaoEstadual:string;

    idRamoAtividade:number;
    atividade:string;

    cep:string;
    rua:string;
    bairro:string;
    cidade:string;
    estado:string;

    nome:string;
    funcao:string;
    email:string;    
}