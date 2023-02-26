export class Produto {
    id: number;
    nome: string;
    pergunta1: string;
    pergunta2: string;
    pergunta3: string;
    pergunta4: string;
    pergunta5: string;
    pergunta6: string;
    pergunta7: string;
    pergunta8: string;
    pergunta9: string;
    pergunta10: string;
    id_subcategoria: number;

    /**
     * Create new Produto
     * @param nome Nome do Produto
     */
    constructor(nome: string, pergunta1: string, pergunta2: string, pergunta3: string, pergunta4: string,
                pergunta5: string, pergunta6: string, pergunta7: string, pergunta8: string, pergunta9: string,
                pergunta10: string, id_subcategoria: number) {
        this.nome = nome;
        this.pergunta1 = pergunta1;
        this.pergunta2 = pergunta2;
        this.pergunta3 = pergunta3;
        this.pergunta4 = pergunta4;
        this.pergunta5 = pergunta5;
        this.pergunta6 = pergunta6;
        this.pergunta7 = pergunta7;
        this.pergunta8 = pergunta8;
        this.pergunta9 = pergunta9;
        this.pergunta10 = pergunta10;
        this.id_subcategoria = id_subcategoria;

    }
}
