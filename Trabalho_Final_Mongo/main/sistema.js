import { Departamento } from '../dados/departamento.js';
import { Curso } from '../dados/curso.js';
import { Estudante} from '../dados/estudante.js';
import { Professor } from '../dados/professor.js';
import { Projeto} from '../dados/projeto.js';

const url = "../Trabalho_Final_Mongo/persistencia";
const pages = ['estudante', 'professor', 'curso', 'projeto', 'departamento'];

class Sistema {
    constructor() {
		this.estudantes = [];
		this.professores = [];
		this.professoresDepartamentos = [];
        this.projetos = [];
        this.cursos = [];
        this.departamentos = [];
		this.paginaatual = undefined;
		this.popupativo = undefined;
		this.pageAjax = undefined;
		this.ultline = undefined;
		this.ultindex = undefined;
		this.popUpInsert = undefined;
    }
    
	/* CRIA UMA TABELA */
	createTable(obj, col, dados, size=[]){
		var key = "";
		var d = "";
		let table = document.createElement('div');
		let head = document.createElement('div');
		let body = document.createElement('div');
		let grid = ""; 
		
		
		table.classList.add("u-table");
		head.classList.add("u-table-head");
		body.classList.add("u-table-body");
		
		let head_line = document.createElement('div');
		head_line.classList.add("u-table-line");
		
		let col_size = col.length;
		for(var i=0 ; i < col_size; i++){
			let head_col = document.createElement('div');
			head_col.classList.add("u-table-col");
			head_col.innerHTML = col[i];
			head_line.appendChild(head_col);
			
			if(size!=[]){
				grid += size[i]+" ";
			}
		}
		
		grid = (grid == []) ? (100/col_size)+"".repeat(col_size): grid;
		head_line.style.gridTemplateColumns = grid;
		
		head.appendChild(head_line);
		
		for (key in dados) {	
			let body_line = document.createElement('div');
			body_line.classList.add("u-table-line");
			for (d in dados[key]) {	
				let body_col = document.createElement('div');
				body_col.classList.add("u-table-col");
				var da = dados[key][d];
				body_col.innerHTML = (da == "" || da == null) ? "--" :dados[key][d];			
				body_line.appendChild(body_col);	
			}
			body_line.style.gridTemplateColumns = grid;
			body.appendChild(body_line);
		}
		
		table.appendChild(head);
		table.appendChild(body);
		
		obj.find(".u-dados").html(table);
	}

	setEventEstudantes(local){
		const sys = this;
		/* PEGA TODOS OS ELEMENTOS (LINHAS) */
		const line = local.find(".u-table").find(".u-table-body").find(".u-table-line");
				
		/* PEGA OS INPUTS DO POPUP */ 
		const idestudante = $("#idestudante");
		const nomeestudante = $("#nomeestudante");
		const idadeestudante = $("#idadeestudante");
		const cursoestudante = $("#cursoestudante");
		const supervisorestudante = $("#profsupervisor");
		const aconselhadorestudante = $("#aconselhadorestudante");				

		/* CRIA EVENTO */
		line.unbind('click').click(function(){
			const l = $(this); /* PEGA O ELEMENTO QUE FOI CLICADO */
			const index = l.index(); /* PEGA O INDEX DO ELEMENTO CLICADO */		
			sys.ultline = l;
			sys.ultindex = index;		
			sys.pageAjax = 0;

			/* COLOCA O VALOR NO INPUT*/
			idestudante.val(sys.estudantes[index].getMatricula())
			nomeestudante.val(sys.estudantes[index].getNome()) 					
			idadeestudante.val(sys.estudantes[index].getIdade())
			cursoestudante.val(sys.estudantes[index].getCodCurso())
			supervisorestudante.val(sys.estudantes[index].getSupervisor())			
			aconselhadorestudante.val(sys.estudantes[index].getConselheiro())

			/* ATIVA O POPUP */
			sys.popup("estudantePop")
		})
	}

	setEventDepartamento(local){
		const sys = this;

		/* PEGA TODOS OS ELEMENTOS (LINHAS) */
		const line = local.find(".u-table").find(".u-table-body").find(".turm");
				
		/* PEGA OS INPUTS DO POPUP */ 
		const iddepartamento = $("#iddepartamento");
		const nomedepartamento = $("#nomedepartamento");
		const escritoriodepartamento = $("#escritoriodepartamento");

		/* CRIA EVENTO */
		line.unbind('click').click(function(){
			const l = $(this); /* PEGA O ELEMENTO QUE FOI CLICADO */
			const index = l.index(); /* PEGA O INDEX DO ELEMENTO CLICADO */				
			sys.ultline = l;
			sys.ultindex = index;
			sys.pageAjax = 4;

			/* COLOCA O VALOR NO INPUT*/
			iddepartamento.val(sys.departamentos[index].getNro())
			nomedepartamento.val(sys.departamentos[index].getNome()) 
			escritoriodepartamento.val(sys.departamentos[index].getEscritorio())					

			/* ATIVA O POPUP */
			sys.popup("departamentoPop")
		})
	}

	setEventProfessor(local){
		const sys = this;

		/* PEGA TODOS OS ELEMENTOS (LINHAS) */
		const line = local.find(".u-table").find(".u-table-body").find(".u-table-line");
				
		/* PEGA OS INPUTS DO POPUP */ 
		const idprofessor = $("#idprofessor");
		const nomeprofessor = $("#nomeprofessor");
		const idadeprofessor = $("#idadeprofessor");			
		const salaprofessor = $("#salaprofessor");
		const especialidadeprofessor = $("#especialidadeprofessor");	
		const departamentoprofessor = $("#departamento_professor");

		/* CRIA EVENTO */
		line.unbind('click').click(function(){
			const l = $(this); /* PEGA O ELEMENTO QUE FOI CLICADO */
			const index = l.index(); /* PEGA O INDEX DO ELEMENTO CLICADO */		
			sys.ultline = l;
			sys.ultindex = index;		
			sys.pageAjax = 1;

			/* COLOCA O VALOR NO INPUT*/
			idprofessor.val(sys.professores[index].getMatricula())
			nomeprofessor.val(sys.professores[index].getNome()) 					
			idadeprofessor.val(sys.professores[index].getIdade())
			salaprofessor.val(sys.professores[index].getSala())					
			especialidadeprofessor.val(sys.professores[index].getEspecialidade())
			departamentoprofessor.val(sys.professores[index].getProfDepartamento())

			/* ATIVA O POPUP */
			sys.popup("professorPop")
		})	
	}

	setEventCurso(local){
		const sys = this;

		/* PEGA TODOS OS ELEMENTOS (LINHAS) */
		const line = local.find(".u-table").find(".u-table-body").find(".u-table-line");
				
		/* PEGA OS INPUTS DO POPUP */ 
		const idcurso = $("#idcurso");
		const nomecurso = $("#nomecurso");
		const nro_departamento = $("#nro_departamento");
		
		/* CRIA EVENTO */
		line.unbind('click').click(function(){
			const l = $(this); /* PEGA O ELEMENTO QUE FOI CLICADO */
			const index = l.index(); /* PEGA O INDEX DO ELEMENTO CLICADO */				
			sys.ultline = l;
			sys.ultindex = index;
			sys.pageAjax = 2;

			/* COLOCA O VALOR NO INPUT*/
			idcurso.val(sys.cursos[index].getCodCurso())
			nomecurso.val(sys.cursos[index].getNome())
			nro_departamento.val(sys.cursos[index].getNro());

			/* ATIVA O POPUP */
			sys.popup("cursoPop")
		})	
	}

	setEventProjeto(local){
		const sys = this;
		/* PEGA TODOS OS ELEMENTOS (LINHAS) */
		const line = local.find(".u-table").find(".u-table-body").find(".u-table-line");
				
		/* PEGA OS INPUTS DO POPUP */ 
		const idprojeto = $("#idprojeto");
		const nomeprojeto = $("#nomeprojeto");
		const orgaoprojeto = $("#orgaoprojeto");
		const inicioprojeto = $("#inicioprojeto");				
		const fimprojeto = $("#fimprojeto");
		const orcamentoprojeto = $("#orcamentoprojeto");
		const pesquisadorprojeto = $("#pesquisadorprojeto");
		/* CRIA EVENTO */
		line.unbind('click').click(function(){
			const l = $(this); /* PEGA O ELEMENTO QUE FOI CLICADO */
			const index = l.index(); /* PEGA O INDEX DO ELEMENTO CLICADO */	
			sys.ultline = l;
			sys.ultindex = index;			
			sys.pageAjax = 3;

			/* COLOCA O VALOR NO INPUT*/
			idprojeto.val(sys.projetos[index].getNumero())
			nomeprojeto.val(sys.projetos[index].getNome()) 					
			orgaoprojeto.val(sys.projetos[index].getOrgaoFinanciador())											
			inicioprojeto.val(sys.projetos[index].getInicio())
			fimprojeto.val(sys.projetos[index].getFim())		
			orcamentoprojeto.val(sys.projetos[index].getOrcamento())
			pesquisadorprojeto.val(sys.projetos[index].getProfPesquisador())
			/* ATIVA O POPUP */
			sys.popup("projetoPop")
		})
	}

	
    /* PEGA TODOS OS ESTUDANTES DO BANCO DE DADOS E COLOCA NA VARIAVEL 'ESTUDANTES' */
    setAllEstudantes(){
		const sys = this;
        $.ajax({
            url: url+"/estudante.php",
            data:"op=0",
            type:"POST",
            cache:false,
            success: function(r){
                const o = JSON.parse(r);
                var key;

                for (key in o) {
					if(o[key] !=""){						
						var b = o[key];
						var e = new Estudante(b[0],b[1],b[2],b[3],b[4],b[5]); 
						sys.estudantes.push(e);
						
					}
				}

				const local = $("#estudante");

				sys.createTable(local, ["id", "nome", "idade", "curso", "supervisor", "aconselhador"], sys.estudantes, ["5%", "20%", "15%", "10%", "20%", "20%"]);							

				sys.setEventEstudantes(local);

				var opt = sys.createOptionEstudante();
				$("#aconselhaAll").html(opt);
			}
        });
    }

	createOptionEstudante(){
		var opt = "<option value=''>Selecionar..</option>";
		var o = this.estudantes;
		for (var i = 0; i< o.length;i++) {
			var b = o[i]; 
			opt += "<option value='"+b['nro_matricula']+"'>"+b['nome']+"</option>";			
		} 
		
		return opt;
	}

    /* PEGA TODOS OS PROFESSORES DO BANCO DE DADOS E COLOCA NA VARIAVEL 'PROFESSORES' */
    setAllProfessores(){
		const sys = this;
        $.ajax({
            url: url+"/professor.php",
            data:"op=0",
            type:"POST",
            cache:false,
            success: function(r){
                const o = JSON.parse(r);
                var key;
				
                for (key in o) {
					if(o[key] != ""){						
						var b = o[key];                                        
						var e = new Professor(b[0],b[1],b[2],b[3],b[4],b[5]);
						sys.professores.push(e);
					}
				}

				const local = $("#professor");
				sys.createTable(local, ["id", "nome", "idade", "sala", "especialidade", "departamento"], sys.professores, ["5%", "25%", "10%", "10%", "30%", "20%"]);
				
				sys.setEventProfessor(local);

				var op = sys.createOptionProfessor();
				$("#pesquisadorAll").html(op);
				$("#supervisorAll").html(op);
				$("#selOriProj").html(op);
				$("#selProfProj").html(op);
            }
        });
	}

	createOptionProfessor(){
		var opt = "<option value=''>Selecionar..</option>";
		var o = this.professores;
		for (var i = 0; i< o.length;i++) {
			var b = o[i]; 
			opt += "<option value='"+b['nro_matricula']+"'>"+b['nome']+"</option>";			
		} 
		
		return opt;
	}

    /* PEGA TODOS OS Cursos DO BANCO DE DADOS E COLOCA NA VARIAVEL 'Cursos' */
    setAllCursos(){
		const sys = this;
        $.ajax({
            url: url+"/curso.php",
            data:"op=0",
            type:"POST",
            cache:false,
            error:function(e) {
				// alert("ERROR")
			},
            success: function(r){
				console.log(r);
                const o = JSON.parse(r);
                var key;
                for (key in o) {
					if(o[key] != ""){						
						var b = o[key];                                        
						var e = new Curso(b[0],b[1], b[2]);
						sys.cursos.push(e);
					}
				}
				/* PEGA ELEMENTO ONDE FICARÁ A TABELA */
				const local = $("#curso");				
				/* CRIA TABELA */
				sys.createTable(local, ["id", "nome", "departamento"], sys.cursos, ["40%", "35%", "35%"]);
				
				sys.setEventCurso(local);
				
				var op = sys.createOptionCurso();
				$("#cursoAll").html(op);
            }
        });
	}

	createOptionCurso(){
		var opt = "<option value=''>Selecionar..</option>";
		var o = this.cursos;
		for (var i = 0; i< o.length;i++) {
			var b = o[i]; 
			opt += "<option value='"+b['cod_curso']+"'>"+b['nome']+"</option>";			
		} 
		
		return opt;
	}

    /* PEGA TODOS OS Departamento DO BANCO DE DADOS E COLOCA NA VARIAVEL 'Departamento' */
    setAllDepartamento(){
		const sys = this;
        $.ajax({
            url: url+"/departamento.php",
            data:"op=0",
            type:"POST",
            cache:false,
            success: function(r){
                const o = JSON.parse(r);
                var key;
				var opt = "<option value=''>Selecionar..</option>";
                
                for (key in o) {
					if(o[key] != ""){						
						var b = o[key];                                        
						var e = new Departamento(b[0],b[1], b[2]); 
						sys.departamentos.push(e);
						opt += "<option value='"+b[0]+"'>"+b[1]+"</option>";					
					}
				}
	
				const local = $("#departamento");
				sys.createTable(local, ["id", "nome", "escritorio"], sys.departamentos, ["10%", "45%", "45%"]);
				
				sys.setEventDepartamento(local);

				$("#departamentoAll1").html(opt);
				$("#departamentoAll2").html(opt);
            }
        });
	}

    /* PEGA TODOS OS Projeto DO BANCO DE DADOS E COLOCA NA VARIAVEL 'Projeto' */
    setAllProjeto(){
		const sys = this;
        $.ajax({
            url: url+"/projeto.php",
            data:"op=0",
            type:"POST",
            cache:false,
            error:function(e) {
				// alert("ERROR")
			},
            success: function(r){
                const o = JSON.parse(r);
                var key;
                for (key in o) {
					if(o[key] != ""){						
						var b = o[key];                                        
						var e = new Projeto(b[0],b[1], b[2], b[3],b[4],b[5],b[6]); 
						sys.projetos.push(e);
					}
				}
				const local = $("#projeto");
				sys.createTable(local, ["id", "nome", "orgão", "data inicial", "data final", "orçamento", "pesquisador"], sys.projetos, ["10%", "20%", "10%", "10%", "10%" , "10%" ,"30%"]);
				
				sys.setEventProjeto(local);
            }
        });
	}

	
	setValSelect(sel, val){
		sel.prop("selected", false);
		sel.find("option[value='"+val+"']").prop("selected", true);
	}

	formataDados(obj){
		const body = obj.find(".u-popup-body");
		const inp = body.find("input").not("input[type='hidden']");
		const sel = body.find("select");

		const r = inp.add(sel);
		var result = ""+r.eq(0).val();
		for(var i = 1; i< r.length; i++){
			result += "^"+r.eq(i).val();
		}

		return result;
	}

	updateTable(dados){
		const obj = this.ultline.find(".u-table-col");
		if(obj == undefined) return;

		for(var i= 0 ; i < obj.length; i++){
			obj.eq(i).html(dados[i]);
		}

	}

	/* ATUALIZA NO BANCO DE DADOS */
	update(){
		const sys = this;
		const p = pages[sys.pageAjax];
		const dados = sys.formataDados(sys.popupativo);
		const id = $("#id"+p).val();
		const index = sys.ultindex;
        $.ajax({
            url: url+"/"+p+".php",
            data:"op=2&dados="+dados+"&m="+id,
            type:"POST",
            cache:false,
            success: function(r){
				let a = "";
				if(p=="estudante"){	
					a = sys.estudantes[index].update(dados).getArray();				
				}else if(p=="professor"){
					a = sys.professores[index].update(dados).getArray();
				}else if(p=="curso"){
					a = sys.cursos[index].update(dados).getArray();						
				}else if(p=="projeto"){
					a = sys.projetos[index].update(dados).getArray();					
				}else if(p=="departamento"){
					a = sys.departamentos[index].update(dados).getArray();					
				}

				sys.updateTable(a);
				sys.closePopup();
			}
        });
	}


	insert(obj){
		const sys = this;
		const p = sys.pageAjax;
		const dados = sys.formataDados(sys.popupativo);
		$.ajax({
            url: url+"/"+p+".php",
            data:"op=1&dados="+dados,
            type:"POST",
            cache:false,
            error:function(e) {
				// alert("ERROR")
			},
            success: function(r){
				r = r.replace("\n", "");
				r = r.replace("\r", "");
				var d = r.split("^");
				var a = "";
				if(p=="departamento"){
					a = new Departamento(d[0], d[1], d[2]);					
					sys.departamentos.push(a);
					const local = $("#departamento");
					sys.createTable(local, ["id", "nome", "escritorio"], sys.departamentos, ["10%", "45%", "45%"]);
					sys.setEventDepartamento(local);
					
				}else if(p == "curso"){
					a = new Curso(d[0], d[1]);
					sys.cursos.push(a);
					const local = $("#curso");									
					sys.createTable(local, ["id", "nome", "departamento"], sys.cursos, ["40%", "35%", "35%"]);
					sys.setEventCurso(local);

				}else if(p == "professor"){
					a = new Professor(d[0], d[1], d[2],d[3],d[4]);
					sys.professores.push(a);
					const local = $("#professor");
					sys.createTable(local, ["id", "nome", "idade", "sala", "especialidade", "departamento"], sys.professores, ["5%", "25%", "10%", "10%", "25%", "10%"]);
					sys.setEventProfessor(local);
					var op = sys.createOptionProfessor();
					$("#pesquisadorAll").html(op);
					$("#selOriProj").html(op);
					$("#selProfProj").html(op);
				}else if(p == "projeto"){
					a = new Projeto(d[0], d[1], d[2],d[3],d[4],d[5],d[6]);
					sys.projetos.push(a);
					const local = $("#projeto");
					sys.createTable(local, ["id", "nome", "orgão", "data inicial", "data final", "orçamento", "pesquisador"], sys.projetos, ["10%", "20%", "10%", "10%", "10%" , "10%" ,"30%"]);
					sys.setEventProjeto(local);
					
				}else if(p == "estudante"){
					a = new Estudante(d[0],d[1],d[2],d[3],d[4], d[5]);
					sys.estudantes.push(a);
					const local = $("#estudante");
					sys.createTable(local, ["id", "nome", "idade","curso", "supervisor", "aconselhador"], sys.estudantes, ["5%", "25%", "10%", "10%", "25%", "25%"]);							
					sys.setEventEstudantes(local);
				}

				sys.closePopup();
									
			}
        });
	}

	/* MOSTRA POPUP */
	popup(id){
		const pop = $("#"+id);
		const pops = $(".u-popup");
		this.popupativo = pop;

		pops.removeClass("u-popup-act");
		pop.addClass("u-popup-act");
	}

	/* FECHA TODOS OS POPUP*/
	closePopup(){
		const pops = $(".u-popup");
		this.popupativo = undefined;
		pops.removeClass("u-popup-act");
	}
    /* TROCA AS TELAS */
    href(obj){
		const h = obj.attr("h");
        const o = $("#"+h);
        const all = $(".u-content-page");
		this.paginaatual = o;
		this.popUpInsert = h+"PopInsert";
        all.removeClass("u-content-act");        
        o.addClass("u-content-act");
    }
}

const Sys = new Sistema();
    

/* JQUERY - COMEÇA AQUI */
$(document).ready(function(){

    
    /* EVENTOS CLICKS*/
    $(".u-nav-li").click(function(){ Sys.href($(this))});
	$(".u-closed-pop").click(function(){ Sys.closePopup()});
	$(".u-popup-att").click(function(){Sys.update()})
	$(".u-popup-insert").click(function(){Sys.insert()});
	$(".u-top-btn").click(function(){Sys.pageAjax = $(this).attr("h");Sys.popup(Sys.popUpInsert)})
	$("#EstudanteProj").click(function(){Sys.insertEstudanteProj()});
    $("#ProfessorProj").click(function(){{Sys.insertProfessorProj()}});
	$("#DepartamentoProf").click(function(){{Sys.getInsertDepartProfessor()}});

	$(".u-tab").click(function(){
		const o = $(this);
		const all = $(".u-tab");

		/*MOSTRA QUAL BOTAO FOI CLICADO*/
		all.removeClass("u-tab-act")
		o.addClass("u-tab-act");

		/* FAZ  APARECER A TELA QUE EU CLIQUEI*/
		const a = $(".u-popup-tab");		
		a.removeClass("u-popup-tab-act");
		a.eq(o.index()).addClass("u-popup-tab-act");

		const tabbtns = $(".u-tab-btn");

		/*MOSTRA QUAL BOTAO FOI APERTADO*/
		tabbtns.hide();
		tabbtns.eq(o.index()).show();

	});

	$(".u-tab-d").click(function(){
		const o = $(this);
		const all = $(".u-tab-d");

		/*MOSTRA QUAL BOTAO FOI CLICADO*/
		all.removeClass("u-tab-act")
		o.addClass("u-tab-act");

		/* FAZ  APARECER A TELA QUE EU CLIQUEI*/
		const a = $(".u-pop-tab-d");		
		a.removeClass("u-popup-tab-act");
		a.eq(o.index()).addClass("u-popup-tab-act");

		const tabbtns = $(".u-tab-btn-d");

		/*MOSTRA QUAL BOTAO FOI APERTADO*/
		tabbtns.hide();
		tabbtns.eq(o.index()).show();

	});

	$("#inicioprojeto").mask("99/99/9999");
	$("#fimprojeto").mask("99/99/9999");
	$("#cadDataF").mask("99/99/9999");
	$("#cadDataI").mask("99/99/9999");

	Sys.setAllEstudantes();
	Sys.setAllProfessores();
	Sys.setAllCursos();
	Sys.setAllDepartamento();
	Sys.setAllProjeto();	
	Sys.href($("#aluno"));
	
});