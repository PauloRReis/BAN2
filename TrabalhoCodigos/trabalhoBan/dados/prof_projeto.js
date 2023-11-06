export class ProfProjeto{
    constructor(nro_matricula, nro_projeto){
        this.nro_matricula = nro_matricula;
        this.nro_projeto = nro_projeto;
    }
    
    getMatricula(){
        return this.nro_matricula;
    }
    getProjeto(){
        return this.nro_projeto;
    }
}