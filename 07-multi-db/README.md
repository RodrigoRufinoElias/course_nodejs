<!-- LISTAR PROCESSOS -->
docker ps

## POSTGRES
<!-- IMAGEM POSTGRES -->
docker run --name postgres -e POSTGRES_USER=rodrigorufino -e POSTGRES_PASSWORD=123mudar -e POSTGRES_DB=heroes -p 5432:5432 -d postgres

<!-- ENTRAR NO CONTAINER "postgres" -->
docker exec -it postgres /bin/bash

<!-- LINKAR "postgres" A UM INTERFACE CLIENT -->
docker run --name adminer -p 8080:8080 --link postgres:postgres -d adminer

<!-- ACESSAR INTERFACE -->
192.168.99.100:8080

## MONGODB
<!-- IMAGEM MONGODB -->
docker run --name mongodb -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=123mudar -d mongo:4

<!-- LINKAR "mongodb" A UM INTERFACE CLIENT -->
docker run --name mongoclient -p 3000:3000 --link mongodb:mongodb -d mongoclient/mongoclient

<!-- CRIAR USUÁRIO COM PERMISSÕES DE LER E ESCREVER NO DB -->
docker exec -it mongodb mongo --host localhost -u admin -p 123mudar --authenticationDatabase admin --eval "db.getSiblingDB('herois').createUser({user: 'rodrigorufino', pwd: '123mudar', roles: [{role: 'readWrite', db: 'herois'}]})"