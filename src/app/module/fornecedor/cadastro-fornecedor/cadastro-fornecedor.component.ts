import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from 'src/app/emitter/modal.service';
import { Endereco } from 'src/app/model/endereco';
import { Fornecedor } from 'src/app/model/fornecedor';
import { Ramo } from 'src/app/model/ramo';
import { Responsavel } from 'src/app/model/responsavel';
import { FornecedorResponse } from 'src/app/model/response/fornecedorResponse';
import { RamoAtividadeResponse } from 'src/app/model/response/ramoAtividadeResponse';
import { FornecedorSignature } from 'src/app/model/signature/fornecedorSignature';
import { FornecedorService } from 'src/app/services/fornecedor.service';
import { RamoAtividadeService } from 'src/app/services/ramo-atividade.service';

@Component({
  selector: 'app-cadastro-fornecedor',
  templateUrl: './cadastro-fornecedor.component.html',
  styleUrls: ['./cadastro-fornecedor.component.scss']
})
export class CadastroFornecedorComponent {

  titulo :string = "";
  editar : boolean = false;
  id: any;
  formularioFornecedor:any;
  fornecedorSignature : FornecedorSignature;
  ramoAtividadeResponse : RamoAtividadeResponse[];

  constructor(
              private activetedRoute : ActivatedRoute,
              private router:Router, 
              private fornecedorService : FornecedorService , 
              private ramoAtividadeService : RamoAtividadeService,
              private modalService : ModalService){

    this.formularioFornecedor = new FormGroup({
      razaoSocial : new FormControl('',[Validators.required]),
      cnpj : new FormControl('',[Validators.required]),
      inscricaoEstadual : new FormControl('',[Validators.required]),
      ramoAtividade : new FormControl('',[Validators.required]),
      cep : new FormControl('',[Validators.required]),
      rua : new FormControl('',[Validators.required]),
      bairro : new FormControl('',[Validators.required]),
      cidade : new FormControl('',[Validators.required]),
      estado : new FormControl('',[Validators.required]),
      nome : new FormControl('',[Validators.required]),
      funcao : new FormControl('',[Validators.required]),
      email : new FormControl('',[Validators.required,Validators.email])
    })

  }
  ngOnInit(): void {

    this.ramoAtividadeService.Obter().subscribe(x => {
      console.log(x)
      this.ramoAtividadeResponse= x;
    })

    this.activetedRoute.paramMap.subscribe(params =>{
      this.id = params.get('codigo');
      if(this.id > 0){
        this.fornecedorService.ObterPorCodigo(this.id).subscribe(x =>{
          let editar = this.ObterFornecedor(x)
          console.log(editar);
          this.SetarFormulario(editar);
          this.ParametrosTela(true)
        })


      }
      else{
        this.ParametrosTela(false);
      }
    })
  }

  ParametrosTela(editar : boolean){
    if(editar){
      this.editar = true;
      this.titulo = "Editar Fornecedor"  
    }
    else{
      this.titulo = "Cadastrar Fornecedor"
    }
  }

  ObterFornecedor(response : FornecedorResponse) : Fornecedor
  {
    let fornecedor = new Fornecedor();
    fornecedor.razaoSocial = response.razaoSocial;
    fornecedor.cnpj = response.cnpj;
    fornecedor.inscricaoEstadual = response.ie;

    let ramoAtividade = new Ramo();
    ramoAtividade.idRamoAtividade = response.idRamoAtividade;
    fornecedor.ramoDeAtividade = ramoAtividade;

    let endereco = new Endereco();
    endereco.rua = response.rua;
    endereco.cidade = response.cidade;
    endereco.bairro = response.bairro;
    endereco.estado = response.estado;
    endereco.cep = response.cep;

    let responsavel = new Responsavel();
    responsavel.email = response.email;
    responsavel.nome = response.nome;
    responsavel.funcao = response.funcao;

    fornecedor.endereco = endereco;
    fornecedor.responsavel = responsavel;
    fornecedor.ramoDeAtividade = ramoAtividade;

    return fornecedor;
  }


  SetarFormulario(fornecedor : Fornecedor){
    this.formularioFornecedor.get('razaoSocial').setValue(fornecedor.razaoSocial);
    this.formularioFornecedor.get('cnpj').setValue(fornecedor.cnpj);
    this.formularioFornecedor.get('inscricaoEstadual').setValue(fornecedor.inscricaoEstadual);
    this.formularioFornecedor.get('ramoAtividade').setValue(fornecedor.ramoDeAtividade.idRamoAtividade);
    this.formularioFornecedor.get('cep').setValue(fornecedor.endereco.cep);
    this.formularioFornecedor.get('rua').setValue(fornecedor.endereco.rua);
    this.formularioFornecedor.get('bairro').setValue(fornecedor.endereco.bairro);
    this.formularioFornecedor.get('cidade').setValue(fornecedor.endereco.cidade);
    this.formularioFornecedor.get('estado').setValue(fornecedor.endereco.estado);
    this.formularioFornecedor.get('nome').setValue(fornecedor.responsavel.nome);
    this.formularioFornecedor.get('funcao').setValue(fornecedor.responsavel.funcao);
    this.formularioFornecedor.get('email').setValue(fornecedor.responsavel.email);
  }


  Incluir(){
    this.fornecedorSignature = new FornecedorSignature();
    //fornecedor
    this.fornecedorSignature.razaoSocial = this.razaoSocial;
    this.fornecedorSignature.cnpj = this.cnpj;
    this.fornecedorSignature.inscricaoEstadual = this.inscricaoEstadual;
    this.fornecedorSignature.idRamoAtividade = this.ramoAtividade;

    //endereco
    this.fornecedorSignature.cep = this.cep;
    this.fornecedorSignature.rua = this.rua;
    this.fornecedorSignature.bairro = this.bairro;
    this.fornecedorSignature.cidade = this.cidade;
    this.fornecedorSignature.estado = this.estado;
    //email
    this.fornecedorSignature.nome = this.nome;
    this.fornecedorSignature.funcao = this.funcao;
    this.fornecedorSignature.email = this.email;

    if(this.editar){
      this.fornecedorSignature.id = this.id;
      this.fornecedorService.Atualizar(this.fornecedorSignature).subscribe(retorno =>{
        this.modalService.AbrirModal(`Produto ${this.fornecedorSignature.razaoSocial} foi atualizado`)      
        this.router.navigate(['/dashboard/fornecedor/listar']);
      },error =>{
        this.modalService.AbrirModal(`Não foi possível atualizar o Fornecedor selecionado`)      
        this.router.navigate(['/dashboard/fornecedor/listar']);
      }
      )

    }else{
      this.fornecedorService.Incluir(this.fornecedorSignature).subscribe(x => {
        this.modalService.AbrirModal("Fornecedor incluido com sucesso")      
        this.router.navigate(['/dashboard/fornecedor/listar']);
      },error =>{
        this.modalService.AbrirModal("Não foi possível incluir o Fornecedor")      
        this.router.navigate(['/dashboard/fornecedor/listar']);
      });      
    }
  }

 

  Voltar(){
    this.router.navigate(['/dashboard/fornecedor/listar']);
  }

  get razaoSocial() { 
    return this.formularioFornecedor.get('razaoSocial').value; 
  }   
  get cnpj() : any { 
    return this.formularioFornecedor.get('cnpj').value; 
  }   
  get inscricaoEstadual() : any { 
    return this.formularioFornecedor.get('inscricaoEstadual').value; 
  }   
  get ramoAtividade() : any { 
    return this.formularioFornecedor.get('ramoAtividade').value; 
  }   
  get cep() : any { 
    return this.formularioFornecedor.get('cep').value; 
  }   
  get rua() : any { 
    return this.formularioFornecedor.get('rua').value; 
  }   
  get bairro() : any { 
    return this.formularioFornecedor.get('bairro').value; 
  }   
  get cidade() : any { 
    return this.formularioFornecedor.get('cidade').value; 
  }   
  get estado() : any { 
    return this.formularioFornecedor.get('estado').value; 
  }   
  get nome() : any { 
    return this.formularioFornecedor.get('nome').value; 
  }   
  get funcao() : any { 
    return this.formularioFornecedor.get('funcao').value; 
  }   
  get email() : any { 
    return this.formularioFornecedor.get('email').value; 
  }   

}
