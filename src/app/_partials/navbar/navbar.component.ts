import {Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {AdminRoutes, UtilizadorRoutes} from '../sidebar/sidebar.component';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../_services/authentication.service';
import {Subscription} from 'rxjs/Subscription';
import {Utilizador} from '../../_models/utilizador';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

    // Subscriptions aggregator, push all "subscribes" here to be able to destroy all of them at once
    subscriptions: Subscription[] = [];

    mobile_menu_visible: any = 0;
    listTitles: any[];
    toggleButton: any;
    sidebarVisible: boolean;
    loggedUtilizador: Utilizador;

    constructor(private location: Location, private element: ElementRef, private router: Router,
                private authenticationService: AuthenticationService) {
        this.location = location;
        this.sidebarVisible = false;
    }

    ngOnInit() {
        const navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
        this.subscriptions.push(
            this.router.events.subscribe(() => {
                this.sidebarClose();
                const $layer: any = document.getElementsByClassName('close-layer')[0];
                if ($layer) {
                    $layer.remove();
                    this.mobile_menu_visible = 0;
                }
            })
        );
        this.loggedUtilizador = this.authenticationService.userValue.response.data;
        if (this.loggedUtilizador.id_tipo_utilizador === 1) {
            this.listTitles = AdminRoutes.filter(listTitle => listTitle);
        } else if (this.loggedUtilizador.id_tipo_utilizador === 2) {
            this.listTitles = UtilizadorRoutes.filter(listTitle => listTitle);
        }
    }

    ngOnDestroy() {
        // Destroy all subscriptions
        this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    }

    logout() {
        this.authenticationService.logout();
    }

    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        setTimeout(function () {
            toggleButton.classList.add('toggled');
        }, 500);

        body.classList.add('nav-open');

        this.sidebarVisible = true;
    };

    sidebarClose() {
        const body = document.getElementsByTagName('body')[0];
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        body.classList.remove('nav-open');
    };

    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        const $toggle = document.getElementsByClassName('navbar-toggler')[0];

        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
        const body = document.getElementsByTagName('body')[0];

        const $layer = document.createElement('div');

        if (this.mobile_menu_visible === 1) {
            // $('html').removeClass('nav-open');
            body.classList.remove('nav-open');
            if ($layer) {
                $layer.remove();
            }
            setTimeout(function () {
                $toggle.classList.remove('toggled');
            }, 400);

            this.mobile_menu_visible = 0;
        } else {
            setTimeout(function () {
                $toggle.classList.add('toggled');
            }, 430);

            $layer.setAttribute('class', 'close-layer');


            if (body.querySelectorAll('.main-panel')) {
                document.getElementsByClassName('main-panel')[0].appendChild($layer);
            } else if (body.classList.contains('off-canvas-sidebar')) {
                document.getElementsByClassName('wrapper-full-page')[0].appendChild($layer);
            }

            setTimeout(function () {
                $layer.classList.add('visible');
            }, 100);

            $layer.onclick = function () { // asign a function
                body.classList.remove('nav-open');
                this.mobile_menu_visible = 0;
                $layer.classList.remove('visible');
                setTimeout(function () {
                    $layer.remove();
                    $toggle.classList.remove('toggled');
                }, 400);
            }.bind(this);

            body.classList.add('nav-open');
            this.mobile_menu_visible = 1;

        }
    };

    getTitle() {
        let title = this.location.prepareExternalUrl(this.location.path());
        if (title.charAt(0) === '#') {
            title = title.slice(1);
        }

        if (title.includes('editar') && !title.includes('0')) {
            return 'Editar';
        }
        if (title.includes('editar') && title.includes('0')) {
            return 'Adicionar';
        }

        for (let item = 0; item < this.listTitles.length; item++) {
            if (title.includes(this.listTitles[item].path)) {
                return this.listTitles[item].title;
            }
        }
        return 'Dashboard';
    }
}
