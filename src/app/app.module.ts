import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';

import {AppRoutingModule} from './app.routing';
import {PartialsModule} from './_partials/partials.module';

import {AppComponent} from './app.component';
import {AdminLayoutComponent} from './layouts/admin-layout/admin-layout.component';
import {LoginComponent} from './login/login.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {AuthInterceptor} from './_services/auth.interceptor';
import {ErrorInterceptor} from './_services/error.interceptor';
import {RegisterComponent} from './register/register.component';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {NgxCsvParserModule} from 'ngx-csv-parser';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CategoriasComponent } from './categorias/categorias/categorias.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { EditarCategoriasComponent } from './categorias/editar-categorias/editar-categorias.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { EditarSubcategoriasComponent } from './subcategorias/editar-subcategorias/editar-subcategorias.component';
import { SubcategoriasComponent } from './subcategorias/subcategorias/subcategorias.component';
import { ProdutosComponent } from './produtos/produtos/produtos.component';
import { EditarProdutosComponent } from './produtos/editar-produtos/editar-produtos.component';
import { ClientesComponent } from './utilizadores/clientes/clientes.component';
import { jsPDF } from "jspdf";
import { CategoriafuncionarioComponent } from './funcionario/categoriafuncionario/categoriafuncionario.component';
import { SubcategoriafuncionarioComponent } from './funcionario/subcategoriafuncionario/subcategoriafuncionario.component';
import { ProdutofuncionarioComponent } from './funcionario/produtofuncionario/produtofuncionario.component';
import { FuncionarioLayoutComponent } from './layouts/funcionario-layout/funcionario-layout.component';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        PartialsModule,
        RouterModule,
        AppRoutingModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        MatAutocompleteModule,
        MatChipsModule,
        MatIconModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatDialogModule,
        MatDividerModule,
        NgxCsvParserModule,
        MatSnackBarModule,
        MatTooltipModule,
        MatGridListModule,
    ],
    declarations: [
        AppComponent,
        AdminLayoutComponent,
        LoginComponent,
        RegisterComponent,
        CategoriasComponent,
        EditarCategoriasComponent,
        EditarSubcategoriasComponent,
        SubcategoriasComponent,
        ProdutosComponent,
        EditarProdutosComponent,
        ClientesComponent,
        CategoriafuncionarioComponent,
        SubcategoriafuncionarioComponent,
        ProdutofuncionarioComponent,
        FuncionarioLayoutComponent,
    ],
    providers: [
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
