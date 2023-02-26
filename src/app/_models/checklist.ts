export class Checklist {
    id: number;
    data: Date;
    nome: string;
    encomenda: string;
    estado: string;
    resposta1: string;
    resposta2: string;
    resposta3: string;
    resposta4: string;
    resposta5: string;
    resposta6: string;
    resposta7: string;
    resposta8: string;
    resposta9: string;
    resposta10: string;
    id_prod_checklist: number;
    id_utilizador_checklist: number;
    id_utilizador: number;

    /**
     * Create new Categoria
     * @param nome Nome da Categoria
     */
    constructor(nome: string, encomenda: string, estado: string, resposta1: string, resposta2: string, resposta3: string,
                resposta4: string, resposta5: string, resposta6: string, resposta7: string, resposta8: string,
                resposta9: string, resposta10: string) {
        this.nome = nome;
        this.encomenda = encomenda;
        this.estado = estado;
        this.resposta1 = resposta1;
        this.resposta2 = resposta2;
        this.resposta3 = resposta3;
        this.resposta4 = resposta4;
        this.resposta5 = resposta5;
        this.resposta6 = resposta6;
        this.resposta7 = resposta7;
        this.resposta8 = resposta8;
        this.resposta9 = resposta9;
        this.resposta10 = resposta10;
    }
}
