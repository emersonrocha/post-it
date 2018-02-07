import ListaNotas from './listaNotas.js';
import FormNotas from './components/formNotas.js';

let secao = document.getElementsByClassName('notes')[0];
const observaMudancasNaLista = () => {
    atualizarSecao(secao);
};

const listaNotas = new ListaNotas(observaMudancasNaLista);

const atualizarSecao = secao => {

    while (secao.firstChild) {
        secao.removeChild(secao.firstChild);
    }

    for (let posicao = 0; posicao < listaNotas.contaTotal(); posicao++) {
        let notaAtual = listaNotas.pega(posicao);   

        // property shorthand
        const props = { posicao, notaAtual, editarFormulario, adicionarNota, removerNota };
        secao.appendChild(new FormNotas(props));
    }
    // secao.innerHTML = conteudoSecao;
}

window.editarFormulario = posicao => listaNotas.edita(posicao);

window.adicionarNota = (inputTitulo, textareaTexto, formulario, posicao) => {
    if (listaNotas.pega(posicao)) {
        listaNotas.salva(posicao, inputTitulo.value, textareaTexto.value);
    } else {
        listaNotas.adiciona(inputTitulo.value, textareaTexto.value);
        formulario.reset();
    }
}

window.removerNota = (evento, posicao) => {
    evento.stopPropagation();
    listaNotas.remove(posicao);
}