-- docker ps

-- docker exec -it 8f19dc9932bf mongo -u rodrigorufino -p 123mudar --authenticationDatabase herois

-- MOSTRAR DATABASES
show dbs
-- MUDANDO O CONTEXTO PARA UMA DATABASE 
use herois
-- MOSTRAR TABELAS (COLEÇÕES)
show collections

-- INSERIR DADOS
db.herois.insert({
    nome: 'Flash',
    poder: 'Velocidade',
    dataNascimento: '1998-01-01'
})

-- INSERIR DADOS COM JS
for(let i = 0; i < 1000; i++) {
    db.herois.insert({
        nome: `Clone_${i}`,
        poder: 'Velocidade',
        dataNascimento: '1998-01-01'
    })
}

-- LISTAR DADOS
db.herois.find()

-- LISTAR 1 DADO
db.herois.findOne()

-- LISTAR DADOS FORMATADO
db.herois.find().pretty()

-- LISTAR DADOS LIMITADAMENTE E ORDEM DECRESCENTE
db.herois.find().limit(1000).sort({nome: -1})

-- LISTAR DADOS FILTRANDO
db.herois.find({nome: 'Flash'})

-- LISTAR DADOS COM COLUNAS ESPECÍFICAS
db.herois.find({}, {poder: 1, _id: 0})

-- UPDATE PERIGOSO (MATA OUTRAS COLUNAS DESTA LINHA)
db.herois.update({ _id: ObjectId("5eced33c57b087bcde9a5964") }, {
    nome: 'Mulher Maravilha'
})

-- UPDATE EM UM DADO DESTA LINHA
db.herois.update({ _id: ObjectId("5eced33c57b087bcde9a5960") }, {
    $set: { nome: 'Kid Flash' }
})

-- DELETE ALL
db.herois.remove({})

-- DELETE POR NOME
db.herois.remove({nome: 'Mulher Maravilha'})