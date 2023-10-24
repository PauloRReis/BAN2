class departamento{
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
    
}