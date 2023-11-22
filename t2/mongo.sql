use Universidade

db.turma.insertMany([
    {ano: 2019, semestre: 2},
    {ano: 2020, semestre: 1},
    {ano: 2020, semestre: 2},
])

db.estudante.insertMany([
    {nome: 'Carlos', idade: 41, cd_turma: 1 },
    {nome: 'Alberto', idade: 21, cd_turma: 1 },
    {nome: 'Rodolfo', idade: 22, cd_turma: 1 },
    {nome: 'João', idade: 26, cd_turma: 1 },
    {nome: 'André', idade: 50, cd_turma: 1 },
    {nome: 'Maria', idade: 23, cd_turma: 1 },
    {nome: 'Julia', idade: 56, cd_turma: 1 },
    {nome: 'Nathalia', idade: 42, cd_turma: 1 },
    {nome: 'Bruna', idade: 19, cd_turma: 1 },
    {nome: 'Vitor', idade: 41, aconselhador: 1, cd_turma: 2 },
    {nome: 'Anderson', idade: 21, aconselhador: 2, cd_turma: 2 },
])

db.curso.insertMany([
    {curso: 'TADS'},
    {curso: 'BCC'},
    {curso: 'ENGM'},
    {curso: 'ENGP'},
])

db.professor.insertMany([
    {nome: 'Adilson', idade: 50, sala: 'f203', especialidade: 'Computação Gráfica' },
    {nome: 'Adilson', idade: 50, sala: 'f203', especialidade: 'Computação Gráfica' },
    {nome: 'Adilson', idade: 50, sala: 'f203', especialidade: 'Computação Gráfica' },
])

db.departamento.insertMany([
    {nome: 'DCC', escritorio: 'E200'},
    {nome: 'Física', escritorio: 'E201'},
    {nome: 'Eletrônica', escritorio: 'E202'},
])

db.projeto.insertMany([
    {nome: 'Chips e Microchips', orgao: 'DCC', data_ini:'2019-06-01', data_fim: '2020-06-01',orcamento: 1000.0,pesquisador: 1},
    {nome: 'Servidores', orgao: 'DCC', data_ini:'2020-01-01', data_fim: '2020-07-01',orcamento: 3000.0,pesquisador: 2},
])