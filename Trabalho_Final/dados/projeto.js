class projeto{
    constructor(nome, orgao_financiador, data_ini, data_fim, orcamento, professor_pesquisador){
        //this.nro_projeto = projeto;
        this.nome = nome;
        this.orgao_financiador = orgao_financiador;
        this.data_ini = data_ini;
        this.data_fim = data_fim;
        this.orcamento = orcamento
        this.professor_pesquisador = professor_pesquisador;
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
}