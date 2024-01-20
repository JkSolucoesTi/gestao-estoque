import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/emitter/loader.service';
import { ModalService } from 'src/app/emitter/modal.service';
import { Estoque } from 'src/app/model/estoque';
import { EstoqueResponse } from 'src/app/model/response/estoqueResponse';
import { EstoqueService } from 'src/app/services/estoque.service';

@Component({
  selector: 'app-lista-estoque',
  templateUrl: './lista-estoque.component.html',
  styleUrls: ['./lista-estoque.component.scss']
})
export class ListaEstoqueComponent {

  displayedColumns: string[] = ['Codigo','Nome', 'Quantidade', 'Compra', 'Ação'];

  tela : boolean = false;
  estoque : Estoque[]=[];
  dataSource = new MatTableDataSource(this.estoque);

  constructor(
              private estoqueService:EstoqueService,
              private router:Router,
              private loader:LoaderService,
              private modalService:ModalService){    
}
  ngOnInit(): void {
    this.modalService.emitterObter.subscribe(x =>{

        this.estoqueService.Obter().subscribe(x =>{
          var atualizar = this.ObterEstoqueAtualizado(x);
          this.dataSource.data = atualizar;  
        },error => {
          this.modalService.AbrirModal("Estamos enfrentando problemas");
        });      
    })

    this.estoqueService.Obter().subscribe(x =>{
      this.ObterEstoque(x);
      this.dataSource.data = this.estoque;  
    },error => {
      this.modalService.AbrirModal("Estamos enfrentando problemas");
    });    
  }

  ObterEstoqueAtualizado(estoqueResponse : EstoqueResponse[]):Estoque[]
  {
    let estoqueAtualizado : Estoque[]=[];

    estoqueResponse.forEach(x =>{

      let estoque = new Estoque();
      estoque.id = x.id;
      estoque.codigo = x.codigo;
      estoque.nome = x.nome;
      estoque.quantidade = x.quantidade
      estoque.compra = x.compra;

      estoqueAtualizado.push(estoque);
    })
    return estoqueAtualizado
  }

  ObterEstoque(estoqueResponse : EstoqueResponse[]){
     estoqueResponse.forEach(x =>{

      let estoque = new Estoque();
      estoque.id = x.id;
      estoque.codigo = x.codigo;
      estoque.nome = x.nome;
      estoque.quantidade = x.quantidade
      estoque.compra = x.compra;

      this.estoque.push(estoque);
    })
  }

  @ViewChild(MatPaginator) paginator: any ;
  @ViewChild(MatSort) sort: any;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

    this.paginator.MatPaginatorIntl = new MatPaginatorIntl();
    this.paginator.MatPaginatorIntl.itemsPerPageLabel = "Items por Tela";
  }

  Filtrar(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  Editar(codigo:number){
    this.router.navigate([`/dashboard/estoque/cadastro-produto/${codigo}`]);   
  }

  Excluir(codigo:number,nome:string){
    let url = Component.name;
    this.modalService.AbrirModalDelete(`Deseja excluir o produto ${nome} ?`,codigo,url);
  }
}
