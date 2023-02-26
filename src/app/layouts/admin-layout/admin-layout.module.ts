import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AdminLayoutRoutes} from './admin-layout.routing';
import {DashboardComponent} from '../../dashboard/dashboard.component';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import { UtilizadoresComponent } from 'app/utilizadores/utilizadores/utilizadores.component';
import { EditarUtilizadoresComponent } from 'app/utilizadores/editar-utilizadores/editar-utilizadores.component';
import {PartialsModule} from '../../_partials/partials.module';
import {ChecklistComponent} from '../../checklist/checklist/checklist.component';
import {PdfChecklistComponent} from '../../checklist/pdf-checklist/pdf-checklist.component';
import {ListarChecklistComponent} from '../../checklist/listar-checklist/listar-checklist.component';
import {ClienteComponent} from '../../funcionario/cliente/cliente.component';



@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AdminLayoutRoutes),
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatRippleModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatTooltipModule,
        PartialsModule,
    ],
    declarations: [
        DashboardComponent,
        UtilizadoresComponent,
        EditarUtilizadoresComponent,
        ChecklistComponent,
        PdfChecklistComponent,
        ListarChecklistComponent,
    ]
})

export class AdminLayoutModule {
}
