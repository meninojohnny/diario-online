import { adicionarDisciplina, obterDisciplinas } from './servico.js';

function mostrarAlunos() {
    document.querySelector(".panel-aluno-class").style.display = "block";
    document.querySelector(".panel-nota-class").style.display = "none";
    document.querySelector(".panel-registro-aulas").style.display = "none";
}

function mostrarNotas() {
    document.querySelector(".panel-nota-class").style.display = "block";
    document.querySelector(".panel-aluno-class").style.display = "none";
    document.querySelector(".panel-registro-aulas").style.display = "none";
}

function mostrarRegistroAulas() {
    document.querySelector(".panel-aluno-class").style.display = "none";
    document.querySelector(".panel-nota-class").style.display = "none";
    document.querySelector(".panel-registro-aulas").style.display = "block";
}

var disciplinas = await obterDisciplinas();
console.log(disciplinas);