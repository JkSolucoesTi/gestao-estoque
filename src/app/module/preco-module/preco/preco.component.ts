import { Component } from '@angular/core';
import { ModalService } from 'src/app/emitter/modal.service';

@Component({
  selector: 'app-preco',
  templateUrl: './preco.component.html',
  styleUrls: ['./preco.component.scss']
})
export class PrecoComponent {

  constructor(private modalService:ModalService){

  }

  onClick(){
    this.modalService.AbrirModal('Teste do modulo de preços');
  }

}
