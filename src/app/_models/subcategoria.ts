export class Subcategoria {
    id: number;
    nome: string;
    id_categoria: number;

    /**
     * Create new Subcategoria
     * @param nome Nome da Subcategoria
     */
    constructor(nome: string) {
        this.nome = nome;

    }
}
