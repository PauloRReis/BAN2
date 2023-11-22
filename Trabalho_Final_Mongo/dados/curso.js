export class Curso {
    constructor(cod_curso, nome, nro_departamento){
        this.cod_curso = cod_curso;
        this.nome = nome;
        this.nro_departamento = nro_departamento;
    }

    getCodCurso(){
        return this.cod_curso;
    }

    getNome(){
        return this.nome;
    }
    getNro(){
        return this.nro_departamento;
    }

    getArray(){
        return [this.cod_curso, this.nome, this. nro_departamento];
    }
    update(str){
        const d = str.split("^");

        this.cod_curso = d[0];
        this.nome = d[1];
        this.nro_departamento = d[2];
        
        return this;
    }
}