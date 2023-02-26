export class Categoria {
    id: number;
    nome: string;
    id_utilizador: number;

    /**
     * Create new Categoria
     * @param nome Nome da Categoria
     */
    constructor(nome: string) {
        this.nome = nome;

    }
}
