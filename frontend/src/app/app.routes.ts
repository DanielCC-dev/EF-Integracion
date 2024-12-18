import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ListarMeserosComponent } from './meseros/listar-meseros/listar-meseros.component';
import { UpdateMeseroComponent } from './meseros/update-mesero/update-mesero.component';
import { AddMeserosComponent } from './meseros/add-meseros/add-meseros.component';
import { ListarClientesComponent } from './clientes/listar-clientes/listar-clientes.component';
import { UpdateClienteComponent } from './clientes/update-clientes/update-clientes.component';
import { AddClientesComponent } from './clientes/add-clientes/add-clientes.component';
import { ListarPlatosComponent } from './platos/listar-platos/listar-platos.component';
import { UpdatePlatoComponent } from './platos/update-platos/update-platos.component';
import { AddPlatosComponent } from './platos/add-platos/add-platos.component';
import { LoginComponent } from './pages/login/login.component';
import { ListarCategoriasComponent } from './categorias/listar-categorias/listar-categorias.component';
import { AddCategoriasComponent } from './categorias/add-categorias/add-categorias.component';
import { UpdateCategoriaComponent } from './categorias/update-categoria/update-categoria.component';
import { ErrorComponent } from './pages/error/error.component';
import { userGuardGuard } from './services/user-guard.guard';

export const routes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'home', component: HomeComponent, canActivate: [userGuardGuard]},
    {path: 'meseros', component: ListarMeserosComponent, canActivate: [userGuardGuard]},
    {path: 'addMesero', component: AddMeserosComponent, canActivate: [userGuardGuard]},
    {path: 'updateMesero/:id', component: UpdateMeseroComponent, canActivate: [userGuardGuard]},
    {path: 'clientes', component: ListarClientesComponent, canActivate: [userGuardGuard]},
    {path: 'addCliente', component: AddClientesComponent, canActivate: [userGuardGuard]},
    {path: 'updateCliente/:id', component: UpdateClienteComponent, canActivate: [userGuardGuard]},
    {path: 'platos', component: ListarPlatosComponent, canActivate: [userGuardGuard]},
    {path: 'addPlato', component: AddPlatosComponent, canActivate: [userGuardGuard]},
    {path: 'updatePlato/:id', component: UpdatePlatoComponent, canActivate: [userGuardGuard]},
    {path: 'categorias', component: ListarCategoriasComponent, canActivate: [userGuardGuard]},
    {path: 'addCategoria', component: AddCategoriasComponent, canActivate: [userGuardGuard]},
    {path: 'updateCategoria/:id', component: UpdateCategoriaComponent, canActivate: [userGuardGuard]},
    {path:'**', component: ErrorComponent}
];