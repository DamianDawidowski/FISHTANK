import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';  
  
const routes: Routes = [
    { path: '', redirectTo: 'fishtank', pathMatch: 'full'},  
    { path: 'fishtank', loadChildren: () => import('./fishtank/fishtank.module')
    .then(m => m.FishtankModule)}, 
    { path: 'fishes', loadChildren: () => import('./fishes/fishes.module')
    .then(m => m.FishesModule)},     
    { path: 'auth', loadChildren: () => import('./auth/auth.module')
    .then(m => m.AuthModule)},   
     
 
    // { path: 'auth', component: AuthComponent },
    { path: '**', redirectTo: 'fishtank'}
];

@NgModule({ 
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }