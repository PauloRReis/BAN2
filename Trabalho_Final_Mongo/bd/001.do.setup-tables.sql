CREATE TABLE IF NOT EXISTS "departamento"(
	"nro_departamento" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	"nome" varchar(50),
	"escritorio" varchar(50),
);

CREATE TABLE IF NOT EXISTS "curso"(
	"cod_curso" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	"nome" varchar(50),
	"nro_departamento" int,

	foreign key (nro_departamento) references "departamento"
);

CREATE TABLE IF NOT EXISTS "professor"(
	"nro_matricula" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	"nome" varchar(50),
	"idade" integer,
	"sala" varchar(4),
	"especialidade_pesquisa" varchar(50),
	"prof_departamento" int,

	foreign key(prof_departamento) references "departamento"
);

CREATE TABLE IF NOT EXISTS "projeto"(
	"nro_projeto" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	"nome" VARCHAR(50),
	"orgao_financiador" VARCHAR(50),
	"data_ini" DATE,
	"data_fim" DATE,
	"orcamento" FLOAT,
	"professor_pesquisador" int,

	foreign key(professor_pesquisador) references "professor"
);

CREATE TABLE IF NOT EXISTS "estudante"(
	"nro_matricula" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	"nome" VARCHAR(50),
	"idade" INTEGER,
	"cod_curso" int,
	"prof_supervisor" int,
	"estudante_conselheiro" int,

	foreign key (cod_curso) references "curso",
	foreign key(prof_supervisor) references "professor",
	foreign key(estudante_conselheiro) references "estudante"
);

CREATE TABLE IF NOT EXISTS "participacao_prof_projeto"(
	"id_participacao_prof_projeto" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	"nro_matricula" int,
	"nro_projeto" int,
	
	foreign key (nro_matricula) references "professor",
	foreign key (nro_projeto) references "projeto"
);

CREATE TABLE IF NOT EXISTS "estudante_projeto"(
	"id_estudante_projeto" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	"nro_projeto" int,
	"nro_matricula" int,

	foreign key (nro_projeto) references "projeto",
	foreign key (nro_matricula) references "estudante"
);
