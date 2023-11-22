export class Projeto{
    constructor(nro_projeto, nome, orgao_financiador, data_ini, data_fim, orcamento, professor_pesquisador){
        this.nro_projeto = nro_projeto;
        this.nome = nome;
        this.orgao_financiador = orgao_financiador;
        this.data_ini = data_ini;
        this.data_fim = data_fim;
        this.orcamento = orcamento
        this.professor_pesquisador = professor_pesquisador;
    }

    getNumero(){
        return this.nro_projeto;
    }

    getNome(){
        return this.nome;
    }
    getOrgaoFinanciador(){
        return this.orgao_financiador;
    }
    getInicio(){
        return this.data_ini;
    }
    getFim(){
        return this.data_fim;
    }
    getOrcamento(){
        return this.orcamento;
    }
    getProfPesquisador(){
        return this.professor_pesquisador;
    }
    getArray(){
        return [this.nro_projeto, this.nome, this.orgao_financiador, this.data_ini, this.data_fim, this.orcamento, this.professor_pesquisador];
    }

    update(str){
        const d = str.split("^");
    
        this.nro_projeto = d[0];
        this.nome = d[1];
        this.orgao_financiador = d[2]; 
        this.data_ini = d[3];
        this.data_fim = d[4];  
        this.orcamento = d[5];
        this.professor_pesquisador = d[6];         
        return this;
    }
}