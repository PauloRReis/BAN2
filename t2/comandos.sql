--Criar/trocar banco
use nomeDoBanco

--Mostrar bancos
show dbs

--tabelas == collections
--Criar tabelas -> inserir dados no banco temporário
db.tabelaNome.insertOne({ nome: "Rodrigo", idade: 30, profissao: "Programador", esta_empregado: false })

--Mostrar collections(tabelas)
show collections

--Inserir vários dados
db.tabelaNome.insertMany([
    {nome: "Tadeu", idade: 30, profissao: "arquiteto", esta_empregado: false },
    {nome: "Joao", idade: 30, profissao: "professor", esta_empregado: false },
    {nome: "Vitor", idade: 30, profissao: "Programador", esta_empregado: true },
    {nome: "Tadeu", idade: 30, profissao: "Programador", esta_empregado: false },
])

--Ver dados de uma collection
db.tabelaNome.find()
    --mais bonito
    db.tabelaNome.find().pretty()

--filtrar
db.tabelaNome.find({ esta_empregado: true})

--contagem
db.tabelaNome.find({ esta_empregado: true}).count()

--retornar 1
db.tabelaNome.findOne()

--update 1
db.tabelaNome.updateOne({ nome: "Joao" }, { $set: {esta_empregado: true} })

--update varios -> pode ser usado para adicionar um novo campo
db.tabelaNome.updateMany({}, { $set: {salario: 5000} })

--remover 1
db.tabelaNome.deleteOne({ nome: "Josias" })
--remover varios
db.tabelaNome.deleteMany({ nome: "Josias" })

--Operadores
--Maior que
db.tabelaNome.find({ idade: { $gt: 30}})
--Maior igual
db.tabelaNome.find({ idade: { $gte: 30}})
--menor igual
db.tabelaNome.find({ idade: { $lte: 30}})
--menor que
db.tabelaNome.find({ idade: { $lt: 30}})

