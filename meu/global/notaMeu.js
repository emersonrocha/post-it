export default class Nota {
    constructor(novoTitulo, novoTexto, novaCor, posicao) {
        this._titulo = novoTitulo;
        this._texto = novoTexto;
        this._cor = novaCor;
        this._posicao = posicao;       
    }

    get titulo() {
        return this._titulo;
    }

    set titulo(novoTitulo) {
        this._titulo = novoTitulo;
    }

    get texto() {
        return this._texto;
    }

    set texto(novoTexto) {
        this._texto = novoTexto;
    }

    get cor(){
        return this._cor;
    }

    set cor(novaCor) {
        this._cor = novaCor;
    }

    get posicao(){
        return this._posicao;
    }

    set posicao(posicao){
        this._posicao = posicao;
    }
}