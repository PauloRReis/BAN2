create table departamento(
	nro_departamento SERIAL NOT NULL,
	nome varchar(50),
	escritorio varchar(50),
	primary KEY(nro_departamento)
);

CREATE TABLE curso(
	cod_curso SERIAL NOT NULL,
	nome varchar(50),
	nro_departamento int,
	PRIMARY KEY(cod_curso),
	foreign key (nro_departamento) references departamento(nro_departamento)
);

create table professor(
	nro_matricula SERIAL NOT NULL,
	nome varchar(50),
	idade integer,
	sala varchar(4),
	especialidade_pesquisa varchar(50),
	prof_departamento int,
	PRIMARY KEY(nro_matricula),
	foreign key(prof_departamento) references departamento(nro_departamento)
);

CREATE TABLE projeto(
	nro_projeto SERIAL NOT NULL,
	nome VARCHAR(50),
	orgao_financiador VARCHAR(50),
	data_ini DATE,
	data_fim DATE,
	orcamento FLOAT,
	professor_pesquisador int,
	PRIMARY KEY(nro_projeto),
	foreign key(professor_pesquisador) references professor(nro_matricula)
);

CREATE TABLE estudante(
	nro_matricula SERIAL NOT NULL,
	nome VARCHAR(50),
	idade INTEGER,
	cod_curso int,
	prof_supervisor int,
	estudante_conselheiro int,
	PRIMARY KEY (nro_matricula),
	foreign key (cod_curso) references curso(cod_curso),
	foreign key(prof_supervisor) references professor(nro_matricula),
	foreign key(estudante_conselheiro) references estudante(nro_matricula)
);

create table participacao_prof_projeto(
	id_participacao_prof_projeto SERIAL NOT NULL,
	nro_matricula int,
	nro_projeto int,
	PRIMARY KEY (id_participacao_prof_projeto),
	foreign key (nro_matricula) references professor(nro_matricula),
	foreign key (nro_projeto) references projeto(nro_projeto)
);

CREATE TABLE estudante_projeto(
	id_estudante_projeto SERIAL NOT NULL,
	nro_projeto int,
	nro_matricula int,
	PRIMARY KEY (id_estudante_projeto),
	foreign key (nro_projeto) references projeto(nro_projeto),
	foreign key (nro_matricula) references estudante(nro_matricula)
);

--  1. Gatilho para garantir datas de projeto válidas. Este gatilho verifica se a data de início de um projeto é anterior à data de término.

CREATE OR REPLACE FUNCTION verifica_datas_projeto() RETURNS TRIGGER AS 
$$
BEGIN
    IF NEW.data_ini >= NEW.data_fim THEN
        RAISE EXCEPTION 'A data de início deve ser anterior à data de término do projeto!';
    END IF;
    RETURN NEW;
END;
$$ 
LANGUAGE plpgsql;

CREATE TRIGGER projeto_check_datas BEFORE INSERT OR UPDATE ON projeto FOR EACH ROW
EXECUTE PROCEDURE verifica_datas_projeto();


-- 2.  Gatilho para evitar conflito de datas em projetos. Este gatilho verifica se um professor já está envolvido em outro projeto que ocorre durante as mesmas datas.

CREATE OR REPLACE FUNCTION verifica_conflito_datas_projeto() RETURNS TRIGGER AS 
$$
DECLARE
    outro_projeto_id INTEGER;
BEGIN
    SELECT nro_projeto INTO outro_projeto_id
    FROM projeto
    WHERE professor_pesquisador = NEW.professor_pesquisador
    AND (NEW.data_ini BETWEEN data_ini AND data_fim OR NEW.data_fim BETWEEN data_ini AND data_fim);
    
    IF outro_projeto_id IS NOT NULL THEN
        RAISE EXCEPTION 'O professor já está envolvido em outro projeto durante as mesmas datas!';
    END IF;
    
    RETURN NEW;
END;
$$ 
LANGUAGE plpgsql;

CREATE TRIGGER projeto_check_conflito_datas BEFORE INSERT OR UPDATE ON projeto FOR EACH ROW
EXECUTE PROCEDURE verifica_conflito_datas_projeto();


--  3.Gatilho para impedir que estudantes se inscrevam em cursos de departamentos diferentes. Este gatilho verifica se o departamento do curso selecionado é o mesmo do estudante.

CREATE OR REPLACE FUNCTION verifica_departamento_curso_estudante() RETURNS TRIGGER AS 
$$
BEGIN
    DECLARE curso_departamento INTEGER;
    
    SELECT nro_departamento INTO curso_departamento
    FROM curso
    WHERE cod_curso = NEW.cod_curso;
    
    IF curso_departamento <> NEW.cod_departamento THEN
        RAISE EXCEPTION 'O estudante só pode se inscrever em cursos de seu próprio departamento!';
    END IF;
    
    RETURN NEW;
END;
$$ 
LANGUAGE plpgsql;

CREATE TRIGGER estudante_check_departamento_curso BEFORE INSERT OR UPDATE ON estudante FOR EACH ROW
EXECUTE PROCEDURE verifica_departamento_curso_estudante();

--  4. Gatilho para estudante não ser seu proprio conselheiro

CREATE OR REPLACE FUNCTION verifica_conselheiro() RETURNS TRIGGER AS 
$$
BEGIN
    IF NEW.estudante_conselheiro = NEW.nro_matricula THEN
        RAISE EXCEPTION 'Um estudante não pode ser seu próprio conselheiro!';
    END IF;
    RETURN NEW;
END;
$$ 
LANGUAGE plpgsql;

CREATE TRIGGER estudante_check_conselheiro BEFORE INSERT OR UPDATE ON estudante FOR EACH ROW
EXECUTE PROCEDURE verifica_conselheiro();


--  5. Gatilho para se dois estudantes estão tentando ser conselheiros um do outro

CREATE OR REPLACE FUNCTION verifica_conselheiros() RETURNS TRIGGER AS 
$$
BEGIN
    IF (
        NEW.estudante_conselheiro IS NOT NULL AND
        EXISTS (SELECT 1 FROM estudante WHERE nro_matricula = NEW.estudante_conselheiro AND estudante_conselheiro = NEW.nro_matricula)
    ) THEN
        RAISE EXCEPTION 'Dois estudantes não podem ser conselheiros um do outro!';
    END IF;

    RETURN NEW;
END;
$$ 
LANGUAGE plpgsql;

CREATE TRIGGER estudante_check_conselheiros BEFORE INSERT OR UPDATE ON estudante FOR EACH ROW 
EXECUTE PROCEDURE verifica_conselheiros();
