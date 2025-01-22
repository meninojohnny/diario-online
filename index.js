import {findAllDisciplina} from './servico.js';

console.log("Aqui");

var disciplinas = [];

async function init() {
    disciplinas = await findAllDisciplina();
    criarDisciplinaList();
    mostrarMain();
}

function criarDisciplinaList() {
    const disciplinaList = document.querySelector(".list-disciplina");
    disciplinaList.innerHTML = "";

    disciplinas.forEach(item => {
        disciplinaList.innerHTML += criarDisciplinaItem(item);
    });

    
};

function criarDisciplinaItem(item) {
    var disciplinaItem = `<a class="disciplina-item" href="turma.html?disciplina=${item.id}">
                            <span><i class="${item.icone}"></i></span>
                            <span>${item.nome}</span>
                         </a>`;
    return disciplinaItem;
}

function mostrarMain() {
    document.querySelector(".main").style.display = "block";
    document.querySelector(".loading-spinner").style.display = "none";
}

init();
