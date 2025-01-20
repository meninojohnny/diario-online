import {findAllTurma, findDisciplinaById} from './servico.js';

var params = {}
var disciplinaId = ""
var disciplina = ""
var turmas = []

async function init() {
    params = new URLSearchParams(window.location.search);
    disciplinaId = params.get('disciplina');
    disciplina = await findDisciplinaById(disciplinaId);
    turmas = await findAllTurma();

    adicionarAppBar()
    criarTurmaList();
    mostrarMain();
}

function adicionarAppBar() {
        const textAppBar = document.querySelector(".app-bar");
        textAppBar.innerHTML = `<a class="btn-back-app-bar" href="../index.html"><i class="fa-solid fa-arrow-left"></i></a>
                                <span class="text-app-bar">${disciplina.nome}</span> 
                                <a class="btn-app-bar" href="../index.html"><i class="fa-solid fa-house"></i></a>`;
}



function criarTurmaList() {
    const turmaList = document.querySelector(".list-turmas");
    turmaList.innerHTML = "";
    turmas.forEach(item => {
        turmaList.innerHTML += criarTurmaItem(item);
    });

}

function criarTurmaItem(item) {
    var turmaItem = `<a href="disciplina.html?disciplina=${disciplinaId}&turma=${item.id}" class="card-item-turma">
                        <i class="fa-solid fa-users-line"></i>
                        ${item.nome}
                    </a>`;
    return turmaItem;
}

function mostrarMain() {
    document.querySelector(".main").style.display = "block";
    document.querySelector(".loading-spinner").style.display = "none";
}

init();
