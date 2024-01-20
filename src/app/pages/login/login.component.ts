import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/emitter/modal.service';
import { LoginResponse } from 'src/app/model/response/loginResponse';
import { LoginSignature } from 'src/app/model/signature/loginSignature';
import { LoginService } from 'src/app/services/login.service';
import { ModalComponent } from 'src/app/shared/modal/information/modal.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public loginForm :any;
  public loding:boolean = false;


  constructor(public dialog:MatDialog, 
    private modalService:ModalService, 
    private loginService:LoginService, 
     private router:Router){
    this.InicializarFormularioLogin();
  }

  InicializarFormularioLogin(){
    this.loginForm = new FormGroup({
      usuario: new FormControl('',Validators.required),
      senha : new FormControl('',Validators.required)
    })
  }

  EfetuarLogin(){    
    this.loding = true;
   let loginSignature = new LoginSignature();
   loginSignature.usuario = this.usuario;
   loginSignature.senha = this.senha;

   const myObserver = {
    next: (x: LoginResponse) =>{ 
      if(x.success === true){
        this.router.navigateByUrl('dashboard/home/page');
      }else{
        this.modalService.AbrirModal("Não foi possível realizar o login , tente novamente")
        this.loding =false;
     }
    },
    error: (err: any) => {      
      this.modalService.AbrirModal(err.message);
      this.loding =false;
    },catch: (c : any)=>{
      this.modalService.AbrirModal(c.message)
      this.loding =false;
    },
    complete: () => {    
      this.loding = false;
    },
   }

   this.loginService.Login(loginSignature).subscribe(myObserver);

  }

  EnterSubmit(event : any,form : any) {
  if (event.keyCode === 13 && form.status === "VALID") { 
    this.EfetuarLogin();
  } 
 }

 get usuario() { 
  return this.loginForm.get('usuario').value; 
}
 
 get senha() { 
  return this.loginForm.get('senha').value; 
 }

}
