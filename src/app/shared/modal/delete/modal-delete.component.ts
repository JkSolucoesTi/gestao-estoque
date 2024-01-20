import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalService } from 'src/app/emitter/modal.service';
import { ModalDelete } from './modalDelete';
import { EstoqueService } from 'src/app/services/estoque.service';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.scss']
})
export class ModalDeleteComponent {

  modalDelete = new ModalDelete();

  constructor(
    public dialog: MatDialog,
    private modalService:ModalService,
    private estoqueService:EstoqueService) {
    this.modalService.emitterDelete.subscribe(x => {

      this.modalDelete.mensagem = x.mensagem;
      this.modalDelete.id = x.id;
      this.modalDelete.url = x.url;

      console.log(x.url)
    })
  }

  Excluir()
  {
    this.estoqueService.Excluir(this.modalDelete.id).subscribe(x =>{
      if(x)
        {
          this.modalService.AbrirModal("Produto excluído do estoque");
          this.modalService.ListarItens();
        } 
        else
        {
          this.modalService.AbrirModal("Não foi possível excluir o produto no estoque")
          this.modalService.ListarItens();      
        }
    })    
  }

}
