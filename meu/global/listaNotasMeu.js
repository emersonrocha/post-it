import Nota from './notaMeu.js';

//observador >> função é para rodar o atualiza secao quando algum item for alterado.

class ListaNotas {
    constructor(observador) {
        this._listaInterna = [];
        this._observador = observador;
    }

    adiciona(novoTitulo, novoTexto, novaCor, posicao) {
        let nota = new Nota(novoTitulo, novoTexto, novaCor, posicao);
        this._listaInterna.push(nota);
        this._observador();
    }

    removeUma(posicao) {
        this._listaInterna.splice(posicao, 1);
        this._observador();
    }

    removeVarias(posicao, quantidade) {
        this._listaInterna.splice(posicao, quantidade);
        this._observador();
    }

    edita(posicao) {
        this._listaInterna[posicao].editando = true;
        this._observador();
    }   

    substitui(posicao, nota){
        this._listaInterna[posicao] = new Nota(nota);
        this._observador();
    }

    substitui(posicao, novoTitulo, novoTexto, novaCor, posicaoNota){
        this._listaInterna[posicao] = new Nota(novoTitulo, novoTexto, novaCor, posicaoNota);
        this._observador();
    }

    salva(posicao, novoTitulo, novoTexto) {
        this._listaInterna[posicao].titulo = novoTitulo;
        this._listaInterna[posicao].texto = novoTexto;
        this._listaInterna[posicao].editando = false;
        this._observador();
    }

    pega(posicao) {
        return this._listaInterna[posicao];
    }

    total() {
        return this._listaInterna.length;
    }
};

export default ListaNotas;