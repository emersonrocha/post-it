var lista = localStorage.getItem("notas") ? JSON.parse(localStorage.getItem("notas")) : [];
var notaEditando = false;

document.oncontextmenu = new Function ("return false");
console.dir(document);

if (lista.length > 0) {
    atualizarNotas(lista, document.getElementById("secao-notas"))
}

//https://nettuts.s3.amazonaws.com/771_sticky/step5.html
function atualizarNotas(notas, secao) {
    localStorage.setItem("notas", JSON.stringify(notas));
    secao.innerHTML = '';
    for (var c = 0; c < notas.length; c++) {
        var cor = style = 'style="background-color:' + notas[c].cor + ';"'
        secao.innerHTML +=
            '<form class="note" ' + cor + ' ondblclick="editarNota(' + c + ', this.parentElement.previousElementSibling)" oncontextmenu="editarNotaLocal(' + c + ', this)">' +
            '<button ' + cor + ' class="note__control" type="button" onclick="onRemoveClick(this.form.parentElement, ' + c + ')">' +
            '<i class="fa fa-times" aria-hidden="true"></i>' +
            '</button>' +
            '<input ' + cor + ' class="note__title" name="title" type="text" value="' + notas[c].titulo + '" disabled ></input>' +
            '<textarea  ' + cor + ' class="note__body" name="body" disabled>' + notas[c].body + '</textarea>' +
            '<input type="color" name="cor" value="' + notas[c].cor + '" class="oculto">'+
            '<button class="note__control oculto" type="button" onclick="adicionarNota(this.form, '+c+')">Concluído</button>'+
            '</form>';
    }
}

function adicionarNota(form, index_editar) {
    console.log(form, index_editar, notaEditando);
    console.dir(form);     

    var nota = {
        titulo: form.title.value,
        body: form.body.value,
        cor: form.cor.value
    };

    //adicionar nota dentro na lista
    if (index_editar !== null) {   
        //Se já tem substitui a que existe    
        lista[index_editar] = nota;
        atualizarNotas(lista, form.parentElement);
    } else {
        //Se não tem adiciona no final
        if(notaEditando !== false){
            lista[notaEditando] = nota
        }else{
            lista.push(nota);
        }
        notaEditando = false;
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
