import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from 'src/app/emitter/modal.service';
import { Estoque } from 'src/app/model/estoque';
import { Fornecedor } from 'src/app/model/fornecedor';
import { EstoqueResponse } from 'src/app/model/response/estoqueResponse';
import { FornecedorResponse } from 'src/app/model/response/fornecedorResponse';
import { ProdutoSignature } from 'src/app/model/signature/produtoSignature';
import { EstoqueService } from 'src/app/services/estoque.service';
import { FornecedorService } from 'src/app/services/fornecedor.service';

@Component({
  selector: 'app-cadastro-estoque',
  templateUrl: './cadastro-estoque.component.html',
  styleUrls: ['./cadastro-estoque.component.scss']
})
export class CadastroEstoqueComponent {

  titulo:string ="";
  editar : boolean = false;
  carregamento : boolean = true;

  estoque = new EstoqueResponse();
  codigoProduto : any;
  formProduto:any;
  fornecedores:Fornecedor[]=[]

  constructor(private router:Router , 
    private estoqueService:EstoqueService, 
    private fornecedorService:FornecedorService,
    private modalService:ModalService,
    private activatedRoute: ActivatedRoute
    ){

    this.formProduto = new FormGroup({
      codigo : new FormControl('',Validators.required),
      nome : new FormControl('',Validators.required),
      fornecedor : new FormControl(''),
      quantidade : new FormControl('',[Validators.required]),
      compra : new FormControl('',[Validators.required,Validators.min(0)])
    })
  }
  ngOnInit(): void {
    
    this.fornecedorService.Obter().subscribe(x => {
      this.ObterFornecedores(x);
    })   
    this.TelaEditar();
  }

  TelaEditar(){    
    this.activatedRoute.paramMap.subscribe(params =>{
      this.codigoProduto = params.get('codigo');
      if(this.codigoProduto > 0){
      this.estoqueService.ObterPorCodigo(this.codigoProduto).subscribe(estoque => {   
        let editar = this.ObterProduto(estoque);   
        this.SetarFormulario(editar);
        this.ParametrosTela(true);
        })
      }else{
        this.ParametrosTela(false);
      }      
    })  
  }

  ParametrosTela(editar : boolean){
    if(editar){
      this.editar = true;
      this.titulo = "Editar Produto"  
    }
    else{
      this.titulo = "Cadastrar Produto"
    }
    this.carregamento = false;
  }

  ObterProduto(estoqueResponse:EstoqueResponse) : Estoque{

    let estoque = new Estoque();    
    estoque.codigo = estoqueResponse.codigo
    estoque.compra = estoqueResponse.compra
    estoque.quantidade = estoqueResponse.quantidade
    estoque.nome = estoqueResponse.nome
    estoque.fornecedorId = estoqueResponse.fornecedorId
    return estoque;
  }

  SetarFormulario(estoque : Estoque){    
    this.formProduto.get('codigo').setValue(estoque.codigo);
    this.formProduto.get('nome').setValue(estoque.nome);
    this.formProduto.get('fornecedor').setValue(estoque.fornecedorId);
    this.formProduto.get('quantidade').setValue(estoque.quantidade);    
    this.formProduto.get('compra').setValue(estoque.compra * 100);
  }

  ObterFornecedores(fornecedorResponse : FornecedorResponse[]){
    fornecedorResponse.forEach(x =>{
      let fornecedor = new Fornecedor;
      fornecedor.id = x.id;
      fornecedor.razaoSocial = x.razaoSocial;      
      this.fornecedores.push(fornecedor);
    })
  }

  IncluirProduto(){
    let produtoSignature = new ProdutoSignature();
    produtoSignature.codigo = Number(this.codigo);
    produtoSignature.nome = this.nome;
    produtoSignature.fornecedorId = Number(this.fornecedor);
    produtoSignature.quantidade = Number(this.quantidade);
    produtoSignature.compra = Number(this.compra / 100);

    if(this.editar){
      produtoSignature.id = this.codigoProduto;
      this.estoqueService.Atualizar(produtoSignature).subscribe(retorno =>{    
        if(retorno)
        {
          this.modalService.AbrirModal(`Produto atualizado`)      
          this.router.navigate(['/dashboard/estoque/listar']);          
        }
        else
        {
          this.modalService.AbrirModal("Não foi possível atualizar o produto no estoque");      
          this.router.navigate(['/dashboard/estoque/listar']);    
        }
      },error => {

        this.modalService.AbrirModal("Estamos enfrentando problemas");      
      }
      
      )
    }else{      
      this.estoqueService.Incluir(produtoSignature).subscribe(retorno =>{
        if(retorno)
        {
          this.modalService.AbrirModal("Produto incluido no estoque") ;    
          this.router.navigate(['/dashboard/estoque/listar']);  
        } 
        else
        {
          this.modalService.AbrirModal("Não foi possível incluir o produto no estoque")      
          this.router.navigate(['/dashboard/estoque/listar']);    
        }
      },error => {
        this.modalService.AbrirModal("Estamos enfrentando problemas");      
      }
      )
    }
  }

  Voltar(){
    this.router.navigate(['/dashboard/estoque/listar']);
  }

  get codigo() { 
    return this.formProduto.get('codigo').value; 
  }   
   get nome() { 
    return this.formProduto.get('nome').value; 
   }
   get fornecedor() { 
    return this.formProduto.get('fornecedor').value; 
  }   
   get quantidade() { 
    return this.formProduto.get('quantidade').value; 
   }
   get compra() { 
    return this.formProduto.get('compra').value; 
  }     

  get formattedValue(): string {
    return (this.formProduto.get('compra').value / 100).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  onInput(inputElement: any) {
    const value = inputElement.value;
    // Remove caracteres não numéricos
    const numericValue = parseFloat(value!.replace(/\D/g, '')) || 0;

    // Atualiza o valor numérico
    this.formProduto.get('compra').setValue(numericValue);
  }

}
