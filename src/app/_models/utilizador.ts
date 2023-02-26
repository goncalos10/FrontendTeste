import {TipoUtilizador} from './tiposUtilizador';

export class Utilizador {
    id: number;
    nome: string;
    username: string;
    email: string;
    password: string;
    telemovel: string;
    id_tipo_utilizador: number;

    /**
     * Create new Utilizador
     * @param nome Nome do Utilizador
     * @param username Username do Utilizador
     * @param email Email do Utilizador
     * @param password Password do Utilizador (already hashed)
     * @param telemovel Telemovel do Utilizador
     */
    constructor(nome: string, username: string, email: string, password: string, telemovel: string) {
        this.nome = nome;
        this.username = username;
        this.email = email;
        this.password = password;
        this.telemovel = telemovel;

    }
}
