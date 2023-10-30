import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AngularFireStorageModule } from '@angular/fire/storage';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./views/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'detalhes/:index',
    loadChildren: () => import('./views/detalhes/detalhes.module').then( m => m.DetalhesPageModule)
  },
  {
    path: 'adicionar',
    loadChildren: () => import('./views/adicionar/adicionar.module').then( m => m.AdicionarPageModule)
  },
  {
    path: 'editar/:index',
    loadChildren: () => import('./views/editar/editar.module').then( m => m.EditarPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}


