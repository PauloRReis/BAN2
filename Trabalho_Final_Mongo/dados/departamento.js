export class Departamento{
    constructor(nro_departamento, nome, escritorio){
        this.nro_departamento = nro_departamento;
        this.nome = nome;
        this.escritorio = escritorio;
    }

    getNro(){
        return this.nro_departamento;
    }
    getNome(){
        return this.nome;
    }
    getEscritorio(){
        return this.escritorio;
    }
    getArray(){
        return [this.nro_departamento, this.nome, this.escritorio];
    }
    update(str){
        const d = str.split("^");

        this.nro_departamento = d[0];
        this.nome = d[1];
        this.escritorio = d[2];
        
        return this;
    }
}