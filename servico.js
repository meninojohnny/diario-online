// service.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, doc, getDoc, query, where, deleteDoc, orderBy, updateDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

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

export async function adicionarAluno(nome, turmaId) {
  try {
    const docRef = await addDoc(collection(db, "aluno"), {
      nome: nome,
      turma: turmaId
    });
    return docRef.id;
  } catch (e) {
    console.error("Erro ao adicionar documento:", e);
  }
}

export async function findAlunoById(id) {
  try {
      const docRef = doc(db, "aluno", id);
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
      const q = query(collection(db, "aluno"), where("turma", "==", turmaId), orderBy("nome", "asc"));
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

export async function removerAluno(alunoId) {
  try {
      const docRef = doc(db, "aluno", alunoId);
      await deleteDoc(docRef);
      console.log(`Aluno com ID ${alunoId} removido com sucesso!`);
  } catch (error) {
      console.error("Erro ao remover o documento:", error);
  }
}

export async function updateAluno(id, dados) {
  try {
    const docRef = doc(db, "aluno", id);

    await updateDoc(docRef, dados);

    console.log("Aluno atualizado com sucesso!");
  } catch (error) {
    console.error("Erro ao atualizar o aluno:", error);
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
    const q = query(collection(db, "turma"), orderBy("nome", "asc"));
    const querySnapshot = await getDocs(q);
    const turmas = [];
    querySnapshot.forEach((doc) => {
      turmas.push({ id: doc.id, ...doc.data() });
    });
    return turmas;
  } catch (e) {
    console.error("Erro ao obter documentos:", e);
    return [];
  }
}


export async function findTurmaById(id) {
  try {
      const docRef = doc(db, "turma", id); // Consulta direta pelo ID do documento
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
          return { id: docSnap.id, ...docSnap.data() };
      } else {
          console.log("Nenhuma turma encontrada com o ID:", id);
          return null;
      }
  } catch (e) {
      console.error("Erro ao buscar turma pelo ID:", e);
  }
}


export async function adicionarNota(alunoId) {
  var disciplinas = await findAllDisciplina();
  var periodos = ["primeiro", "segundo", "terceiro", "quarto"];

  for (var d of disciplinas) {
    for (var p of periodos) {
      try {
        const docRef = await addDoc(collection(db, "nota"), {
          aluno: alunoId,
          disciplina: d.id,
          periodo: p,
          tg: "0.0",
          ti: "0.0",
          p: "0.0",
          av: "0.0",
          m: "0.0"
        });
      } catch (e) {
        console.error("Erro ao adicionar documento:", e);
      }
    }
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

export async function removerNotas(alunoId) {
  try {
      const q = query(collection(db, "nota"), where("aluno", "==", alunoId));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
          querySnapshot.forEach(async (documento) => {
              const docRef = doc(db, "nota", documento.id);
              await deleteDoc(docRef);
              console.log(`Nota com ID ${documento.id} removido.`);
          });
      } else {
          console.log("Nenhuma nota encontrada.");
      }
  } catch (error) {
      console.error("Erro ao remover notas:", error);
  }
}

export async function updateNota(id, dados) {
  try {
    const docRef = doc(db, "nota", id);

    await updateDoc(docRef, dados);

    console.log("Nota atualizado com sucesso!");
  } catch (error) {
    console.error("Erro ao atualizar a nota:", error);
  }
}

export async function findRegistro(disciplinaId, turmaId, mes) {
  try {
      const q = query(collection(db, "registro"), 
        where("disciplina", "==", disciplinaId,),
        where("turma", "==", turmaId,),
        where("mes", "==", mes,)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
          const registros = [];
          querySnapshot.forEach((doc) => {
            registros.push({ id: doc.id, ...doc.data() });
          });
          return registros;
      } else {
          console.log("Nenhuma registro encontrado");
          return [];
      }
  } catch (e) {
      console.error("Erro ao buscar registro");
  }
}