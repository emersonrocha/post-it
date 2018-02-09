/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _listaNotasMeu = __webpack_require__(1);

var _listaNotasMeu2 = _interopRequireDefault(_listaNotasMeu);

var _formNotaMeu = __webpack_require__(4);

var _formNotaMeu2 = _interopRequireDefault(_formNotaMeu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Rescrevendo todo o javascript separando em componentes e itens do componente, 
//criar todo o html via javascript.

//usada como espelho da secao e armazena as edições no localstorage
var lista = localStorage.getItem("notasNovas") ? JSON.parse(localStorage.getItem("notas")) : [];

var listaNotas = new _listaNotasMeu2.default(atualizador);

function atualizador() {
    atualizarNotas(lista, document.getElementById("secao-notas"));
}

console.log(lista);

if (lista.length > 0) {
    atualizarNotas(lista, document.getElementById("secao-notas"));
}

function atualizarNotas(notas, secao) {
    localStorage.setItem("notasNovas", JSON.stringify(notas));

    // Enquanto existir um primeiro filho remover ele, isso exclui todos os filhos da secao
    while (secao.firstChild) {
        secao.removeChild(secao.firstChild);
    }

    // Obtem o tamanho do array e cria um form para percorer todo ele.
    for (var c = 0; c < listaNotas.total(); c++) {
        var notaAtual = listaNotas.pega(c);
        // property shorthand
        // https://developer.mozilla.org/pt-BR/docs/Web/CSS/Shorthand_properties
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer

        var props = {
            c: c,
            notaAtual: notaAtual,
            editarNotaLocal: editarNotaLocal,
            adicionarNota: adicionarNota,
            onRemoveClick: onRemoveClick
        };
        secao.appendChild(new _formNotaMeu2.default(props));
    }
}

function adicionarNota(form, index_editar) {
    console.log(form, index_editar);
    console.dir(form);

    var nota = {
        titulo: form.title.value,
        body: form.body.value,
        cor: form.cor.value
    };

    //adicionar nota dentro na lista
    if (index_editar !== null) {
        //Se já tem substitui a que existe    
        //lista[index_editar] = nota;
        listaNotas.substitui(index_editar, form.title.value, form.body.value, form.cor.value, index_editar);
        atualizarNotas(lista, form.parentElement);
    } else {
        //Se não tem adiciona no final        
        //lista.push(nota);   
        listaNotas.adiciona(form.title.value, form.body.value, form.cor.value, listaNotas.total());
        atualizarNotas(lista, form.nextElementSibling);
    }
    // limpar formulario   
    form.reset();
}

function onRemoveClick(secao, index) {
    lista.splice(index, 1);
    atualizarNotas(lista, secao);
}

function editarNota(index, form) {
    form.title.value = lista[index].titulo;
    form.body.value = lista[index].body;
    form.cor.value = lista[index].cor;
    notaEditando = index;
}

function editarNotaLocal(index, form) {
    form.cor.className = "";
    form.lastChild.className = "note__control";
    form.title.disabled = false;
    form.body.disabled = false;
}

window.adicionarNota = adicionarNota;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _notaMeu = __webpack_require__(2);

var _notaMeu2 = _interopRequireDefault(_notaMeu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//observador >> função é para rodar o atualiza secao quando algum item for alterado.

var ListaNotas = function () {
    function ListaNotas(observador) {
        _classCallCheck(this, ListaNotas);

        this._listaInterna = [];
        this._observador = observador;
    }

    _createClass(ListaNotas, [{
        key: 'adiciona',
        value: function adiciona(novoTitulo, novoTexto, novaCor, posicao) {
            var nota = new _notaMeu2.default(novoTitulo, novoTexto, novaCor, posicao);
            this._listaInterna.push(nota);
            this._observador();
        }
    }, {
        key: 'removeUma',
        value: function removeUma(posicao) {
            this._listaInterna.splice(posicao, 1);
            this._observador();
        }
    }, {
        key: 'removeVarias',
        value: function removeVarias(posicao, quantidade) {
            this._listaInterna.splice(posicao, quantidade);
            this._observador();
        }
    }, {
        key: 'edita',
        value: function edita(posicao) {
            this._listaInterna[posicao].editando = true;
            this._observador();
        }
    }, {
        key: 'substitui',
        value: function substitui(posicao, nota) {
            this._listaInterna[posicao] = new _notaMeu2.default(nota);
            this._observador();
        }
    }, {
        key: 'substitui',
        value: function substitui(posicao, novoTitulo, novoTexto, novaCor, posicaoNota) {
            this._listaInterna[posicao] = new _notaMeu2.default(novoTitulo, novoTexto, novaCor, posicaoNota);
            this._observador();
        }
    }, {
        key: 'salva',
        value: function salva(posicao, novoTitulo, novoTexto) {
            this._listaInterna[posicao].titulo = novoTitulo;
            this._listaInterna[posicao].texto = novoTexto;
            this._listaInterna[posicao].editando = false;
            this._observador();
        }
    }, {
        key: 'pega',
        value: function pega(posicao) {
            return this._listaInterna[posicao];
        }
    }, {
        key: 'total',
        value: function total() {
            return this._listaInterna.length;
        }
    }]);

    return ListaNotas;
}();

;

exports.default = ListaNotas;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Nota = function () {
    function Nota(novoTitulo, novoTexto, novaCor, posicao) {
        _classCallCheck(this, Nota);

        this._titulo = novoTitulo;
        this._texto = novoTexto;
        this._cor = novaCor;
        this._posicao = posicao;
    }

    _createClass(Nota, [{
        key: "titulo",
        get: function get() {
            return this._titulo;
        },
        set: function set(novoTitulo) {
            this._titulo = novoTitulo;
        }
    }, {
        key: "texto",
        get: function get() {
            return this._texto;
        },
        set: function set(novoTexto) {
            this._texto = novoTexto;
        }
    }, {
        key: "cor",
        get: function get() {
            return this._cor;
        },
        set: function set(novaCor) {
            this._cor = novaCor;
        }
    }, {
        key: "posicao",
        get: function get() {
            return this._posicao;
        },
        set: function set(posicao) {
            this._posicao = posicao;
        }
    }]);

    return Nota;
}();

exports.default = Nota;

/***/ }),
/* 3 */,
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _form = __webpack_require__(5);

var _form2 = _interopRequireDefault(_form);

var _formInput = __webpack_require__(6);

var _formInput2 = _interopRequireDefault(_formInput);

var _formTextarea = __webpack_require__(8);

var _formTextarea2 = _interopRequireDefault(_formTextarea);

var _formButton = __webpack_require__(7);

var _formButton2 = _interopRequireDefault(_formButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// destructuring / immutable
// extract function
// variable shorthand declaration
function FormNotas(props) {
    console.log(props);
    var formNotas = void 0;

    var inputTitulo = new _formInput2.default({
        className: 'note__title',
        type: 'text',
        name: 'titulo',
        placeholder: 'Título',
        disabled: !props.nota.editando,
        value: props.nota.titulo
    });

    var textareaTexto = new _formTextarea2.default({
        className: 'note__body',
        name: 'texto',
        placeholder: 'Criar uma nota...',
        rows: 5,
        disabled: !props.nota.editando,
        children: props.nota.texto
    });

    var children = void 0;
    var click = void 0;

    if (props.nota.editando) {
        var buttonRemover = new _formButton2.default({
            className: 'note__control',
            type: 'button',
            children: '<i class="fa fa-times" aria-hidden="true"></i>',
            click: function click(event) {
                props.removerNota(event, props.posicao);
            }
        });

        var buttonConcluido = new _formButton2.default({
            className: 'note__control',
            type: 'button',
            children: 'Concluído',
            click: function click() {
                props.adicionarNota(inputTitulo, textareaTexto, formNotas, props.posicao);
            }
        });

        children = [buttonRemover, inputTitulo, textareaTexto, buttonConcluido];
    } else {
        children = [inputTitulo, textareaTexto];

        click = function click() {
            props.editarFormulario(props.posicao);
        };
    }

    formNotas = new _form2.default({
        className: 'note',
        children: children,
        click: click
    });

    return formNotas;
}

exports.default = FormNotas;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
// props param
function Form(props) {
    var form = document.createElement('form');

    // destructuring
    form.setAttribute('class', props.className);

    // forEach
    for (var i = 0; i < props.children.length; i++) {
        form.appendChild(props.children[i]);
    }

    if (props.click) {
        form.addEventListener("click", props.click);
    }

    return form;
}

exports.default = Form;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
// props param
function FormInput(props) {
    var formInput = document.createElement('input');

    // destructuring
    formInput.setAttribute('class', props.className);
    formInput.setAttribute('type', props.type);
    formInput.setAttribute('name', props.name);
    formInput.setAttribute('value', props.value);
    formInput.setAttribute('placeholder', props.placeholder);

    // qualquer valor é true
    if (props.readonly) {
        formInput.setAttribute('readonly', true);
    }

    return formInput;
}

exports.default = FormInput;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
// props param
function FormButton(props) {
    var formButton = document.createElement('button');

    // destructuring
    formButton.setAttribute('class', props.className);
    formButton.setAttribute('type', props.type);
    formButton.addEventListener('click', props.click);

    formButton.innerHTML = props.children;

    return formButton;
}

exports.default = FormButton;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
// props param
function FormTextarea(props) {
    var formTextarea = document.createElement('textarea');

    // destructuring
    formTextarea.setAttribute('class', props.className);
    formTextarea.setAttribute('name', props.name);
    formTextarea.setAttribute('rows', props.rows);
    formTextarea.setAttribute('placeholder', props.placeholder);

    // qualquer valor é true
    if (props.readonly) {
        formTextarea.setAttribute('readonly', true);
    }

    formTextarea.innerHTML = props.children;

    return formTextarea;
}

exports.default = FormTextarea;

/***/ })
/******/ ]);