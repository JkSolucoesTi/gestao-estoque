import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalService } from 'src/app/emitter/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  mensagem:string = "";

  constructor(public dialog: MatDialog,private modalService:ModalService) {
    this.modalService.emitter.subscribe(x => {
      this.mensagem = x;
    })
  }
}


