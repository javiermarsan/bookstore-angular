import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  { path: 'admin', loadChildren: './modules/admin/admin.module#AdminModule' },
  { path: 'auth', loadChildren: './modules/auth/auth.module#AuthModule' },
  { path: '', loadChildren: './modules/public/public.module#PublicModule' },
  { path: '**', redirectTo: '/auth/404' },
];

@NgModule({
  /*imports: [RouterModule.forRoot(routes, {
    // preload all modules; optionally we could implement a custom preloading 
    // strategy for just some of the modules
    preloadingStrategy: PreloadAllModules
  })],*/
  imports: [RouterModule.forRoot(routes)],  
  exports: [RouterModule]
})
export class AppRoutingModule {}
