import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../_services/authentication.service';
import {Utilizador} from '../../_models/utilizador';

declare const $: any;

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const AdminRoutes: RouteInfo[] = [
    {path: '/dashboard', title: 'Dashboard', icon: 'dashboard', class: ''},
    {path: '/utilizadores', title: 'Utilizadores', icon: 'group', class: ''},
    {path: '/clientes', title: 'Clientes', icon: 'group', class: ''},
    {path: '/categorias', title: 'Categorias', icon: 'list', class: ''},
    {path: '/subcategorias', title: 'Subcategorias', icon: 'group', class: ''},
    {path: '/produtos', title: 'Produtos', icon: 'shopping_basket', class: ''},
    {path: '/checklists', title: 'Checklists', icon: 'shopping_basket', class: ''},
];

export const UtilizadorRoutes: RouteInfo[] = [
    {path: '/funcionario/checklist', title: 'Checklist', icon: 'group', class: ''},
];

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
    menuItems: RouteInfo[];
    logedUtilizador: Utilizador;

    constructor(private authenticationService: AuthenticationService) { }

    ngOnInit() {
        this.logedUtilizador = this.authenticationService.userValue.response.data;
        if (this.logedUtilizador.id_tipo_utilizador === 1) {
            this.menuItems = AdminRoutes.filter(menuItem => menuItem);
        } else if (this.logedUtilizador.id_tipo_utilizador === 2) {
            this.menuItems = UtilizadorRoutes.filter(menuItem => menuItem);
        }
    }

    logout() {
        this.authenticationService.logout();
    }

    isMobileMenu() {
        return $(window).width() <= 991;
    };
}
