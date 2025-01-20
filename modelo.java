import java.util.List;

class Disciplina {
    private String nome;
}

class Turma {
    private String nome;
}

class Aluno {
    private String nome;
    private String turma;
    private List<Nota> notas;
}

class Nota {
    private String periodo;
    private String aluno;
    private Double tg;
    private Double ti;
    private Double p;
    private Double av;
    private Double m;
}

class RegistroAula {
    private String disciplina;
    private String turma;
    private String data;
    private String mes;
    private String descricao;
}