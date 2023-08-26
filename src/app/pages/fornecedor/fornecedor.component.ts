import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Fornecedor } from 'src/app/model/fornecedor';
import { FornecedorResponse } from 'src/app/model/response/fornecedorResponse';
import { FornecedorService } from 'src/app/services/fornecedor.service';

@Component({
  selector: 'app-fornecedor',
  templateUrl: './fornecedor.component.html',
  styleUrls: ['./fornecedor.component.scss']
})
export class FornecedorComponent implements OnInit {

  displayedColumns: string[] = ['razaoSocial','cnpj', 'inscricaoEstadual','Ação'];

  fornecedor : Fornecedor[]=[]
  dataSource = new MatTableDataSource(this.fornecedor);

  constructor
  (
    private fornecedorService: FornecedorService,
    private router : Router
    ){
  }

  ngOnInit(): void {
    this.fornecedorService.Obter().subscribe(x => {
      this.ObterFornecedores(x);
      this.dataSource.data = this.fornecedor;
      
    })
  }

  Editar(codigo : number){
    this.router.navigate([`dashboard/cadastro-fornecedor/${codigo}`]);  
  }

  ObterFornecedores(fornecedorResponse : FornecedorResponse[]){
    fornecedorResponse.forEach(x =>{

      let fornecedor = new Fornecedor;
      fornecedor.id = x.id;
      fornecedor.razaoSocial = x.razaoSocial;
      fornecedor.cnpj = x.cnpj;
      fornecedor.inscricaoEstadual = x.inscricaoEstadual
      this.fornecedor.push(fornecedor);
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


}
