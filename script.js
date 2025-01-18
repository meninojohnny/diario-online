
function mostrarAlunos() {
    panelAlunos = document.querySelector(".panel-aluno-class").style.display = "block";
    panelAlunos = document.querySelector(".panel-nota-class").style.display = "none";
    panelAlunos = document.querySelector(".panel-registro-aulas").style.display = "none";
}

function mostrarNotas() {
    panelAlunos = document.querySelector(".panel-nota-class").style.display = "block";
    panelAlunos = document.querySelector(".panel-aluno-class").style.display = "none";
    panelAlunos = document.querySelector(".panel-registro-aulas").style.display = "none";
}

function mostrarRegistroAulas() {
    panelAlunos = document.querySelector(".panel-aluno-class").style.display = "none";
    panelAlunos = document.querySelector(".panel-nota-class").style.display = "none";
    panelAlunos = document.querySelector(".panel-registro-aulas").style.display = "block";
}