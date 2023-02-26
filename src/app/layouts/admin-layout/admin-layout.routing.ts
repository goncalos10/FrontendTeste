import {Routes} from '@angular/router';
import { UtilizadoresComponent } from 'app/utilizadores/utilizadores/utilizadores.component';


import {DashboardComponent} from '../../dashboard/dashboard.component';
import {EditarUtilizadoresComponent} from '../../utilizadores/editar-utilizadores/editar-utilizadores.component';
import {CategoriasComponent} from '../../categorias/categorias/categorias.component';
import {EditarCategoriasComponent} from '../../categorias/editar-categorias/editar-categorias.component';
import {SubcategoriasComponent} from '../../subcategorias/subcategorias/subcategorias.component';
import {EditarSubcategoriasComponent} from '../../subcategorias/editar-subcategorias/editar-subcategorias.component';
import {ProdutosComponent} from '../../produtos/produtos/produtos.component';
import {EditarProdutosComponent} from '../../produtos/editar-produtos/editar-produtos.component';
import {ClientesComponent} from '../../utilizadores/clientes/clientes.component';
import {ChecklistComponent} from '../../checklist/checklist/checklist.component';
import {ListarChecklistComponent} from '../../checklist/listar-checklist/listar-checklist.component';
import {PdfChecklistComponent} from '../../checklist/pdf-checklist/pdf-checklist.component';
import {ClienteComponent} from '../../funcionario/cliente/cliente.component';
import {CategoriafuncionarioComponent} from '../../funcionario/categoriafuncionario/categoriafuncionario.component';
import {SubcategoriafuncionarioComponent} from '../../funcionario/subcategoriafuncionario/subcategoriafuncionario.component';
import {ProdutofuncionarioComponent} from '../../funcionario/produtofuncionario/produtofuncionario.component';

// Routes to render inside Admin Dashboard Layout
export const AdminLayoutRoutes: Routes = [
    {path: '', redirectTo: 'dashboard'},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'utilizadores', component: UtilizadoresComponent},
    {path: 'clientes', component: ClientesComponent},
    {path: 'utilizadores/editar/:id_utilizador', component: EditarUtilizadoresComponent},
    {path: 'categorias', component: CategoriasComponent},
    {path: 'categorias/editar/:id_categoria', component: EditarCategoriasComponent},
    {path: 'subcategorias', component: SubcategoriasComponent},
    {path: 'subcategorias/editar/:id_subcategoria', component: EditarSubcategoriasComponent},
    {path: 'produtos', component: ProdutosComponent},
    {path: 'produtos/editar/:id_produto', component: EditarProdutosComponent},
    {path: 'checklists', component: ListarChecklistComponent},
    {path: 'checklists/criar/:id_produto', component: ChecklistComponent},
    {path: 'checklists/pdf/:id_checklist/:id_produto/:id_utilizador', component: PdfChecklistComponent},
    {path: 'checklists/clientes', component: ClienteComponent},
    {path: 'checklists/clientes/:id_cliente', component: CategoriafuncionarioComponent},
    {path: 'checklists/clientes/:id_cliente/:id_categoria', component: SubcategoriafuncionarioComponent},
    {path: 'checklists/clientes/:id_cliente/:id_categoria/:id_subcategoria', component: ProdutofuncionarioComponent},
];
