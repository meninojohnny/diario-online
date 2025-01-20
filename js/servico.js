// service.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, doc, getDoc, query, where } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDLj1ByMR6wCcBlJYQ9f9guGJLVbGn3yLk",
  authDomain: "teste-1c701.firebaseapp.com",
  databaseURL: "https://teste-1c701-default-rtdb.firebaseio.com",
  projectId: "teste-1c701",
  storageBucket: "teste-1c701.firebasestorage.app",
  messagingSenderId: "1024762021401",
  appId: "1:1024762021401:web:d0b3a7d1334da84a28cc88"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function adicionarDisciplina(nome) {
  try {
    const docRef = await addDoc(collection(db, "disciplina"), { nome });
    console.log("Documento adicionado com ID:", docRef.id);
  } catch (e) {
    console.error("Erro ao adicionar documento:", e);
  }
}

export async function adicionarAluno() {
  try {
    const docRef = await addDoc(collection(db, "aluno"), { 
      nome: "João Vitor da Silva Pereira"
    });
  } catch (e) {
    console.error("Erro ao adicionar documento:", e);
  }
}

export async function findAllDisciplina() {
  try {
    const querySnapshot = await getDocs(collection(db, "disciplina"));
    const disciplinas = [];
    querySnapshot.forEach((doc) => {
      disciplinas.push({ id: doc.id, ...doc.data() });
    });
    return disciplinas;
  } catch (e) {
    console.error("Erro ao obter documentos:", e);
    return [];
  }
}

export async function findDisciplinaById(id) {
  try {
      const docRef = doc(db, "disciplina", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
          return docSnap.data();
      } else {
          console.log("Nenhum documento encontrado com o ID fornecido.");
      }
  } catch (e) {
      console.error("Erro ao buscar o documento:", e);
  }
}

export async function findAllTurma() {
  try {
    const querySnapshot = await getDocs(collection(db, "turma"));
    const disciplinas = [];
    querySnapshot.forEach((doc) => {
      disciplinas.push({ id: doc.id, ...doc.data() });
    });
    return disciplinas;
  } catch (e) {
    console.error("Erro ao obter documentos:", e);
    return [];
  }
}

export async function findTurmaById(id) {
  try {
      const docRef = doc(db, "turma", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
          return docSnap.data();
      } else {
          console.log("Nenhum documento encontrado com o ID fornecido.");
      }
  } catch (e) {
      console.error("Erro ao buscar o documento:", e);
  }
}

export async function findAlunoByTurma(turmaId) {
  try {
      const q = query(collection(db, "aluno"), where("turma", "==", turmaId));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
          const alunos = [];
          querySnapshot.forEach((doc) => {
            alunos.push({ id: doc.id, ...doc.data() });
          });
          return alunos;
      } else {
          console.log("Nenhuma aluno encontrado com a turma de id:", turmaId);
          return [];
      }
  } catch (e) {
      console.error("Erro ao buscar aluno pela turma de id:", e);
  }
}

export async function adicionarNota() {
  try {
    const docRef = await addDoc(collection(db, "nota"), {
      aluno: "4RblWc1CFRfiPmWyuf4T",
      disciplina: "GARGV03ZI8YkJEngxDfl",
      periodo: "quarto",
      tg: "0.0",
      ti: "0.0",
      p: "0.0",
      av: "0.0",
      m: "0.0"
    });
    console.log("Documento adicionado com ID:", docRef.id);
  } catch (e) {
    console.error("Erro ao adicionar documento:", e);
  }
}

export async function findNota(alunoId, disciplinaId, periodo) {
  try {
      const q = query(collection(db, "nota"), 
        where("aluno", "==", alunoId,),
        where("disciplina", "==", disciplinaId,),
        where("periodo", "==", periodo,)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
          const notas = [];
          querySnapshot.forEach((doc) => {
            notas.push({ id: doc.id, ...doc.data() });
          });
          return notas;
      } else {
          console.log("Nenhuma nota encontrada");
          return [];
      }
  } catch (e) {
      console.error("Erro ao buscar nota");
  }
}

// adicionarNota();