import {Routes} from '@angular/router';
import {ClienteComponent} from '../../funcionario/cliente/cliente.component';
import {CategoriafuncionarioComponent} from '../../funcionario/categoriafuncionario/categoriafuncionario.component';
import {SubcategoriafuncionarioComponent} from '../../funcionario/subcategoriafuncionario/subcategoriafuncionario.component';
import {ProdutofuncionarioComponent} from '../../funcionario/produtofuncionario/produtofuncionario.component';
import {ChecklistComponent} from '../../checklist/checklist/checklist.component';

// Routes to render inside Funcionario Layout
export const FuncionarioLayoutRoutes: Routes = [
    {path: 'funcionario/checklist', component: ClienteComponent},
    {path: 'funcionario/checklist/:id_cliente', component: CategoriafuncionarioComponent},
    {path: 'funcionario/checklist/:id_cliente/:id_categoria', component: SubcategoriafuncionarioComponent},
    {path: 'funcionario/checklist/:id_cliente/:id_categoria/:id_subcategoria', component: ProdutofuncionarioComponent},
    {path: 'funcionario/criar/:id_produto', component: ChecklistComponent},
];
