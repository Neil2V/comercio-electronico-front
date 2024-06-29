import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'productos',
    loadChildren: () => import('./modules/producto/producto.module').then(m => m.ProductoModule)
  },
  {
    path: 'pedidos',
    loadChildren: () => import('./modules/pedido/pedido.module').then(m => m.PedidoModule)
  },
  {
    path: '',
    redirectTo: '/productos',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'productos',
    pathMatch: 'full'
  }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
