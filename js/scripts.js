var lista = [];
//https://nettuts.s3.amazonaws.com/771_sticky/step5.html
function atualizarNotas(notas, sessao) {
    sessao.innerHTML = '';
    for (var c = 0; c < notas.length; c++) {
        var cor = style='style="background-color:'+ notas[c].cor +';"'
        sessao.innerHTML +=
            '<form class="note" '+cor+'>' +
            '<button '+cor+' class="note__control" type="button" onclick="onRemoveClick(this.form.parentElement, ' + c + ')">' +
            '<i class="fa fa-times" aria-hidden="true"></i>' +
            '</button>' +
            '<input '+cor+' class="note__title" value="' + notas[c].titulo + '" disabled ></input>' +
            '<textarea  '+cor+' class="note__body" disabled>' + notas[c].body + '</textarea>' +
            '</form>';
    }
}

function adicionarNota(form) {
    //criar variavel nota
    var nota = {
        titulo: form.title.value,
        body: form.body.value,
        cor: form.cor.value
    };
    console.log(nota);
    //adicionar nota dentro da lista
    lista.push(nota);
    // limpar formulario
    atualizarNotas(lista, form.nextElementSibling)
    form.reset();
}

function onRemoveClick(sessao, index){
    console.log(sessao, index);
    lista.splice(index, 1);
    console.log(lista);
    atualizarNotas(lista, sessao)   
}
