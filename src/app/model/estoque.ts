import { Fornecedor } from "./fornecedor";

export class Estoque {

    constructor(){
        this.id = 0
        this.codigo = 0;
        this.nome = "";
        this.quantidade = 0;
        this.compra = 0;
    }
    id: number;
    codigo : number;
    nome: string;
    quantidade : number;
    compra : number;
    fornecedorId : number;
}