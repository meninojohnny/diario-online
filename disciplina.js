import {findDisciplinaById, findTurmaById, findAlunoByTurma, findNota, findRegistro} from '../servico.js';
var params = ""
var disciplinaId = ""
var turmaId = ""
var disciplina = ""
var turma = ""
var alunos = []

async function init() {
        params = new URLSearchParams(window.location.search);
        disciplinaId = params.get('disciplina');
        turmaId = params.get('turma');  
        disciplina = await findDisciplinaById(disciplinaId);
        turma = await findTurmaById(turmaId);
        alunos = await findAlunoByTurma(turmaId);
        adicionarAppBar();
        criarAlunoList();
        criarNotaList();
        criarRegistroList();
        mostrarMain();
}

function mostrarMain() {
    document.querySelector(".main").style.display = "block";
    document.querySelector(".loading-spinner").style.display = "none";
}

function adicionarAppBar() {
    const textAppBar = document.querySelector(".app-bar");
    textAppBar.innerHTML = `<a class="btn-back-app-bar" href="../pages/turma.html?disciplina=${disciplinaId}"><i class="fa-solid fa-arrow-left"></i></a>
                            <span class="text-app-bar">${turma.nome} - ${disciplina.nome}</span> 
                            <a class="btn-app-bar" href="../index.html"><i class="fa-solid fa-house"></i></a>`;
}

window.mostrarPanel = function(panel) {
    document.querySelector(".panel-aluno-class").style.display = "none";
    document.querySelector(".panel-nota-class").style.display = "none";
    document.querySelector(".panel-registro-aulas").style.display = "none";
    document.querySelector(`.${panel}`).style.display = "block";
}

function criarAlunoList() {
    const alunoList = document.querySelector(".list-aluno");
    alunoList.innerHTML = "";
    alunos.forEach(item => {
        alunoList.innerHTML += criarAlunoItem(item);
    })
}

function criarAlunoItem(item) {
    const alunoItem = `<div class="aluno-item">
                            <div class="aluno-item-content">
                                <i class="fa-solid fa-user"></i>
                                <span class="nome-aluno">${item.nome}</span>
                            </div>
                            <span class="btn-remove-aluno"><i class="fa-solid fa-trash-can"></i></span>
                        </div>`;
    return alunoItem;
}

async function criarNotaList() {
    const periodos = ["primeiro", "segundo", "terceiro", "quarto"]
    for (const p of periodos) {
        const notaList = document.querySelector(`.list-nota-${p}`);
        notaList.innerHTML = "";
        for (const aluno of alunos) {
            notaList.innerHTML += await criarNotaItem(aluno, p);
        }
    }
}

async function criarNotaItem(aluno, periodo) {
    var nota = await findNota(aluno.id, disciplinaId, periodo);
    nota = nota[0];
    var notaItem = `<div class="aluno-item">
                <span class="nome-aluno">${aluno.nome}</span>
                <span class="nota-aluno-tg">${nota.tg}</span>
                <span class="nota-aluno-ti">${nota.ti}</span>
                <span class="nota-aluno-p">${nota.p}</span>
                <span class="nota-aluno-av">${nota.av}</span>
                <span class="nota-aluno-m">${nota.m}</span>
            </div>`;
    return notaItem;
}

async function criarRegistroList() {
    const meses = ["janeiro", "fevereiro"];
    for (const mes of meses) {
        const registros = await findRegistro(disciplinaId, turmaId, mes);
        if (registros.length > 0) {
            for (const r of registros) {
                var registroList = document.querySelector(`.list-registro-${mes}`);
                registroList.innerHTML = "";
                registroList.innerHTML += criarRegistroItem(r);
            }  
        }
                  
    }
}

function criarRegistroItem(r) {
    var registroItem = `<div class="registro-atividade-item">
                            <span class="data-registro"><i class="fa-solid fa-calendar-days"></i> ${r.data}</span>
                            <span>${r.descricao}</span>
                        </div>`;
    return registroItem;
}

window.editarListAluno = function() {
    document.querySelector(".btn-edit-list-alunos").style.display = "none";
    document.querySelector(".btn-cancel-list-alunos").style.display = "block";
    document.querySelector(".btn-save-list-alunos").style.display = "block";
    document.querySelector(".btn-remove-aluno").style.display = "flex";
}

var alunosAdicionados = [];
window.adicionarAluno = function() {
    var campoNome = document.querySelector(".campo-nome-aluno");
    if (campoNome.value.length != 0) {
        alunosAdicionados.push(campoNome.value.trim());
        const alunoList = document.querySelector(".list-aluno");
        alunoList.innerHTML += criarAlunoItem({nome: campoNome.value});
    }
}

init();
