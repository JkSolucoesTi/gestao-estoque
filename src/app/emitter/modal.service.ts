import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from '../shared/modal/information/modal.component';
import { ModalDeleteComponent } from '../shared/modal/delete/modal-delete.component';
import { ModalDelete } from '../shared/modal/delete/modalDelete';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private dialog:MatDialog) { }

  emitter = new EventEmitter<string>();
  emitterDelete = new EventEmitter<ModalDelete>();
  emitterObter = new EventEmitter<boolean>();

  Mensagem(mensagem:string){
    this.emitter.emit(mensagem)
  }

  MensagemDelete(mensagem:string,id : number,url :string){
    let modalDelete = new ModalDelete();
    modalDelete.mensagem = mensagem;
    modalDelete.id = id;
    modalDelete.url = url;

    this.emitterDelete.emit(modalDelete);
  }

  ObterItens()
  {
    this.emitterObter.emit(true);
  }


  ListarItens()
  {
    this.ObterItens();
  }

  AbrirModal(mensagem : string){

    let config = new MatDialogConfig()    
    config.minHeight = "100px";          
    config.minWidth = "450px";
    config.maxWidth = "900px";   
    config.enterAnimationDuration = '2000ms';
    config.exitAnimationDuration = '1000ms';
    
    this.dialog.open(ModalComponent,config)
    this.Mensagem(mensagem);
  }

  AbrirModalDelete(mensagem : string , id : number, url : string){

    let config = new MatDialogConfig()    
    config.minHeight = "100px";          
    config.minWidth = "450px";
    config.maxWidth = "900px";   
    config.enterAnimationDuration = '2000ms';
    config.exitAnimationDuration = '1000ms';
    
    this.dialog.open(ModalDeleteComponent,config)
    this.MensagemDelete(mensagem,id,url);
  }

}
