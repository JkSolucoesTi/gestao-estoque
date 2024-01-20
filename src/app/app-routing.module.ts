import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [  
    {
      path: 'login',
      component: LoginComponent
    }
    ,
    {
      path: '',
      component: LoginComponent
    },
    {
    path:'dashboard',
    component:DashboardComponent,
    children:[
      {
        path: 'home',
        loadChildren: () => import('../app/module/home/home.module').then(m => m.HomeModule)     
      }
      ,
      {
      path: 'preco',
      loadChildren: () => import('../app/module/preco-module/preco-module.module').then(m => m.PrecoModuleModule)      
      }  
      ,
      {
        path: 'estoque',
        loadChildren: () => import('../app/module/estoque/estoque.module').then(m => m.EstoqueModule)         
      }
      ,
      {
        path: 'fornecedor',
        loadChildren: () => import('../app/module/fornecedor/fornecedor.module').then(m => m.FornecedorModule)         
      }    
    ]   
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
