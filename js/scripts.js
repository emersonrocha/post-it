var lista = localStorage.getItem("notas") ? JSON.parse(localStorage.getItem("notas")) : [];

document.oncontextmenu = new Function ("return false");
console.dir(document);

if (lista.length > 0) {
    atualizarNotas(lista, document.getElementById("sessao-notas"))
}

//https://nettuts.s3.amazonaws.com/771_sticky/step5.html
function atualizarNotas(notas, sessao) {
    localStorage.setItem("notas", JSON.stringify(notas));
    sessao.innerHTML = '';
    for (var c = 0; c < notas.length; c++) {
        var cor = style = 'style="background-color:' + notas[c].cor + ';"'
        sessao.innerHTML +=
            '<form class="note" ' + cor + ' ondblclick="editarNota(' + c + ', this.parentElement.previousElementSibling)" oncontextmenu="editarNotaLocal(' + c + ', this)">' +
            '<button ' + cor + ' class="note__control" type="button" onclick="onRemoveClick(this.form.parentElement, ' + c + ')">' +
            '<i class="fa fa-times" aria-hidden="true"></i>' +
            '</button>' +
            '<input ' + cor + ' class="note__title" name="title" type="text" value="' + notas[c].titulo + '" disabled ></input>' +
            '<textarea  ' + cor + ' class="note__body" name="body" disabled>' + notas[c].body + '</textarea>' +
            '<input type="color" name="cor" value="' + notas[c].cor + '" class="oculto">'+
            '<button class="note__control oculto" type="button" onclick="adicionarNota(this.form, true, '+c+')">Concluído</button>'+
            '</form>';
    }
}

function adicionarNota(form, index_editar) {
    console.log(form, is_editar, index_editar);
    console.dir(form);
    //criar variavel nota
    var nota = {
        titulo: form.title.value,
        body: form.body.value,
        cor: form.cor.value
    };

    //adicionar nota dentro da lista
    if (index_editar !== null) {
        is_editar = false;
        lista[index_editar] = nota;
        atualizarNotas(lista, form.parentElement);
    } else {
        lista.push(nota);
        atualizarNotas(lista, form.nextElementSibling);
    }
    // limpar formulario   
    form.reset();
}

function onRemoveClick(sessao, index) {
    lista.splice(index, 1);
    atualizarNotas(lista, sessao)
}

function editarNota(index, form) {    
    form.title.value = lista[index].titulo;
    form.body.value = lista[index].body
    form.cor.value = lista[index].cor    
}

function editarNotaLocal(index, form){    
    form.cor.className = "";
    form.lastChild.className = "note__control";
    form.title.disabled = false;
    form.body.disabled = false;        
}
