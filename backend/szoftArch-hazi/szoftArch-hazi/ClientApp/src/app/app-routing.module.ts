import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MyStuffComponent } from './components/my-stuff/my-stuff.component';
import { ProductsComponent } from './components/products/products.component';
import { RegisterComponent } from './components/register/register.component';
import { SetsComponent } from './components/sets/sets.component';
import { HomeComponent } from './home';
import { AuthGuard } from './services/auth.guard';


/* const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'products', component: ProductsComponent},
  { path: 'sets', component: SetsComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
]; */

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'products', component: ProductsComponent, canActivate: [AuthGuard] },
  { path: 'sets', component: SetsComponent, canActivate: [AuthGuard]  },
  { path: 'my-stuff', component: MyStuffComponent, canActivate: [AuthGuard]  },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
