import ListaNotas from './global/listaNotasMeu.js';
import FormNota from './components/formNotaMeu.js';

//Rescrevendo todo o javascript separando em componentes e itens do componente, 
//criar todo o html via javascript.

//usada como espelho da secao e armazena as edições no localstorage
var lista = localStorage.getItem("notasNovas") ? JSON.parse(localStorage.getItem("notas")) : [];

var listaNotas = new ListaNotas(atualizador)

function atualizador(){
    atualizarNotas(lista, document.getElementById("secao-notas"))
}

console.log(lista);

if (lista.length > 0) {
    atualizarNotas(lista, document.getElementById("secao-notas"))
}

function atualizarNotas(notas, secao) {
    localStorage.setItem("notasNovas", JSON.stringify(notas));      

     // Enquanto existir um primeiro filho remover ele, isso exclui todos os filhos da secao
    while (secao.firstChild) {
        secao.removeChild(secao.firstChild);
    }

     // Obtem o tamanho do array e cria um form para percorer todo ele.
    for (let c = 0; c < listaNotas.total(); c++) {
        let nota = listaNotas.pega(c);   
        // property shorthand
        // https://developer.mozilla.org/pt-BR/docs/Web/CSS/Shorthand_properties
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer

        const props = { 
            possicao: c, 
            nota, 
            editarNotaLocal, 
            adicionarNota, 
            onRemoveClick 
        };
        secao.appendChild(new FormNota(props));
    }
}

function adicionarNota(form, index_editar) {
    console.log(form, index_editar);
    console.dir(form);     

    var nota = {
        titulo: form.title.value,
        body: form.body.value,
        cor: form.cor.value,        
    };

    //adicionar nota dentro na lista
    if (index_editar !== null) {   
        //Se já tem substitui a que existe    
        //lista[index_editar] = nota;
        listaNotas.substitui(index_editar, form.title.value, form.body.value, form.cor.value, index_editar)
        atualizarNotas(lista, form.parentElement);
    } else {
        //Se não tem adiciona no final        
        //lista.push(nota);   
        listaNotas.adiciona(form.title.value, form.body.value, form.cor.value, listaNotas.total())
        atualizarNotas(lista, form.nextElementSibling);
    }
    // limpar formulario   
    form.reset();
}

function onRemoveClick(secao, index) {
    lista.splice(index, 1);
    atualizarNotas(lista, secao)
}

function editarNota(index, form) {    
    form.title.value = lista[index].titulo;
    form.body.value = lista[index].body;
    form.cor.value = lista[index].cor; 
    notaEditando = index;   
}

function editarNotaLocal(index, form){    
    form.cor.className = "";
    form.lastChild.className = "note__control";
    form.title.disabled = false;
    form.body.disabled = false;        
}

const editarFormulario = posicao => listaNotas.edita(posicao);

window.adicionarNota = adicionarNota;