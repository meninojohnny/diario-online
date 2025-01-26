import {
    findDisciplinaById, findTurmaById, 
    findAlunoByTurma, findNota, 
    findRegistro, adicionarNota, 
    adicionarAluno, removerAluno, 
    removerNotas, updateAluno} from './servico.js';
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
        criarPanels();
        criarRegistroList();
        mostrarMain();
}

function criarPanels() {
    criarAlunoList();
    criarNotaList();
}

function mostrarMain() {
    document.querySelector(".main").style.display = "block";
    document.querySelector(".loading-spinner").style.display = "none";
}

function adicionarAppBar() {
    const textAppBar = document.querySelector(".app-bar");
    textAppBar.innerHTML = `<a class="btn-back-app-bar" href="turma.html?disciplina=${disciplinaId}"><i class="fa-solid fa-arrow-left"></i></a>
                            <span class="text-app-bar">${turma.nome} - ${disciplina.nome}</span> 
                            <a class="btn-app-bar" href="../index.html"><i class="fa-solid fa-house"></i></a>`;
}

window.mostrarPanel = function(panel) {
    document.querySelector(".panel-aluno-class").style.display = "none";
    document.querySelector(".panel-nota-class").style.display = "none";
    document.querySelector(".panel-registro-aulas").style.display = "none";
    document.querySelector(`.${panel}`).style.display = "block";

    fecharEditarListAluno();
}

async function criarAlunoList() {
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
                                <span class="nome-aluno nome-aluno-item-${item.id}">${item.nome}</span>
                                <span><input type="text" class="edit-nome-aluno form-aluno-item-${item.id}" value='${item.nome}' aria-label="Username" aria-describedby="basic-addon1"></span> 
                            </div>
                            <span id='${item.id}' onclick="editarAlunoItem(id)" class="btn-edit-aluno edit-aluno-item-${item.id}"><i class="fa-solid fa-pen"></i></span>
                            <span id='${item.id}' onclick="removerAluno(id)" class="btn-remove-aluno remove-aluno-item-${item.id}"><i class="fa-solid fa-trash-can"></i></span>
                            <span id='${item.id}' onclick="cancelEditAlunoItem(id)" class="btn-cancel-aluno cancel-aluno-item-${item.id}"><i class="fa-solid fa-xmark"></i></span>
                            <span id='${item.id}' onclick="saveEditAlunoItem(id)" class="btn-save-aluno save-aluno-item-${item.id}"><i class="fa-solid fa-check"></i></span>
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
                <div class="aluno-item-content">
                    <span class="nome-aluno">${aluno.nome}</span>
                    <span class="nota-aluno-tg">${nota.tg}</span>
                    <span class="nota-aluno-ti">${nota.ti}</span>
                    <span class="nota-aluno-p">${nota.p}</span>
                    <span class="nota-aluno-av">${nota.av}</span>
                    <span class="nota-aluno-m">${nota.m}</span>
                <div>
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

window.abrirEditarListAluno = function() {
    document.querySelector(".btn-edit-list-alunos").style.display = "none";
    document.querySelector(".btn-cancel-list-alunos").style.display = "block";
    document.querySelectorAll(".btn-remove-aluno").forEach(function(btn) {
        btn.style.display = "flex";
    });
    document.querySelectorAll(".btn-edit-aluno").forEach(function(btn) {
        btn.style.display = "flex";
    });
    document.querySelector(".form-add-aluno").style.display = "flex";
}

window.fecharEditarListAluno = function() {
    document.querySelector(".btn-edit-list-alunos").style.display = "block";
    document.querySelector(".btn-cancel-list-alunos").style.display = "none";
    document.querySelectorAll(".btn-remove-aluno").forEach(function(btn) {
        btn.style.display = "none";
    });
    document.querySelectorAll(".btn-edit-aluno").forEach(function(btn) {
        btn.style.display = "none";
    });
    document.querySelector(".form-add-aluno").style.display = "none";
}

window.editarAlunoItem = function(id) {
    document.querySelector(".remove-aluno-item-" + id).style.display = "none";
    document.querySelector(".edit-aluno-item-" + id).style.display = "none";
    document.querySelector(".cancel-aluno-item-" + id).style.display = "flex";
    document.querySelector(".save-aluno-item-" + id).style.display = "flex";
    document.querySelector(".form-aluno-item-" + id).style.display = "block";
    document.querySelector(".nome-aluno-item-" + id).style.display = "none";
}

window.cancelEditAlunoItem = function(id) {
    document.querySelector(".remove-aluno-item-" + id).style.display = "flex";
    document.querySelector(".edit-aluno-item-" + id).style.display = "flex";
    document.querySelector(".cancel-aluno-item-" + id).style.display = "none";
    document.querySelector(".save-aluno-item-" + id).style.display = "none";
    document.querySelector(".form-aluno-item-" + id).style.display = "none";
    document.querySelector(".nome-aluno-item-" + id).style.display = "block";
}

window.saveEditAlunoItem = async function(id) {
    var value = document.querySelector(".form-aluno-item-" + id).value;
    await updateAluno(id, {nome: value});
    cancelEditAlunoItem(id);
    alunos = await findAlunoByTurma(turmaId);
    criarPanels();
    abrirEditarListAluno();
}

window.adicionarAluno = async function() {
    var campoNome = document.querySelector(".campo-nome-aluno");
    var value = campoNome.value;
    if (value.length != 0) {
        var alunoId = await adicionarAluno(value, turmaId);
        await adicionarNota(alunoId);
        alunos = await findAlunoByTurma(turmaId);
        criarPanels();
        campoNome.value = "";
        abrirEditarListAluno();
    }
}

window.removerAluno = async function(id) {
    await removerNotas(id);
    await removerAluno(id);
    alunos = await findAlunoByTurma(turmaId);
    criarPanels();
    abrirEditarListAluno();
}

init();
