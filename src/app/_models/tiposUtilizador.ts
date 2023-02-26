import {Utilizador} from './utilizador';

export class TipoUtilizador {
    id: number;
    tipo: string;
    Utilizadores: Utilizador[];

    /**
     * Create new Tipo de Utilizador
     * @param tipo Node do Tipo de Utilizador
     */
    constructor(tipo: string) {
        this.tipo = tipo;
    }
}
