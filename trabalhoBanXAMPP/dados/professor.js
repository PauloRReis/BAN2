export class Professor{
    constructor(nro_matricula, nome, idade, sala, especialidade_pesquisa, prof_departamento){
        this.nro_matricula = nro_matricula;
        this.nome = nome;
        this.idade = idade;
        this.sala = sala;
        this.especialidade_pesquisa = especialidade_pesquisa;
        this.prof_departamento = prof_departamento;
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
    getSala(){
        return this.sala;
    }
    getEspecialidade(){
        return this.especialidade_pesquisa;
    }
    getProfDepartamento(){
        return this.prof_departamento;
    }
    getArray(){
        return [this.nro_matricula, this.nome, this.idade, this.sala, this.especialidade_pesquisa, this.prof_departamento ];
    }
    update(str){
        const d = str.split("^");

        this.nro_matricula = d[0];
        this.nome = d[1];
        this.idade = d[2];
        this.sala = d[3];
        this.especialidade_pesquisa = d[4];
        this.prof_departamento = d[5];
        return this;
    }

}