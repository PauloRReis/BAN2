class estudante{
    constructor(nro_matricula, nome, idade, cod_curso, prof_supervisor, estudante_conselheiro){
        this.nro_matricula = nro_matricula;
        this.nome = nome;
        this.idade = idade;
        this.cod_curso = cod_curso;
        this.prof_supervisor = prof_supervisor;
        this.estudante_conselheiro = estudante_conselheiro;
    }

    getMatricula(){
        return this.nro_matricula;
    }

    getNome(){
        return this.nome;
    }
    getIdade(){
        return this.idade;
    }
    getCodCurso(){
        return this.cod_curso;
    }
    getSupervisor(){
        return this.prof_supervisor;
    }
    getConselheiro(){
        return this.estudante_conselheiro;
    }

}