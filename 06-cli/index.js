const Commander = require('commander');
const Database = require('./database');
const Heroi = require('./heroi');

async function main() {
    Commander
        .version('v1')
        .option('-n, --nome [value]', "Nome do Herói")
        .option('-p, --poder [value]', "Poder do Herói")
        .option('-i, --id [value]', "Id do Herói")

        .option('-c, --cadastrar', "Cadastrar um Herói")
        .option('-l, --listar', "Listar um Herói")
        .option('-r, --remover', "Remover um Herói por Id")
        .option('-a, --atualizar [Value]', "Atualizar um Herói por Id")
        .parse(process.argv);

    const heroi = new Heroi(Commander);

    try {
        if(Commander.cadastrar) {
            delete heroi.id;

            const resultado = await Database.cadastrar(heroi);

            if (!resultado) {
                console.error('Herói não cadastrado!');
                return;
            }

            console.log('Herói cadastrado com sucesso!');
        }
        
        if(Commander.listar) {
            const resultado = await Database.listar();
            console.log(resultado);
            return;
        }
        
        if(Commander.remover) {
            const resultado = await Database.remover(heroi.id);

            if (!resultado) {
                console.error('Não foi possível detelar o herói!');
                return;
            }

            console.log('Herói removido com sucesso!');
        }
        
        if(Commander.atualizar) {
            const idAtualzar = parseInt(Commander.atualizar);

            // Remover todas as chaves com undefined || null
            const dado = JSON.stringify(heroi);
            const heroiAtualizar = JSON.parse(dado);

            const resultado = await Database.atualizar(idAtualzar, heroiAtualizar);

            if (!resultado) {
                console.error('Não foi possível atualizar o herói!');
                return;
            }

            console.log('Herói atualizado com sucesso!');
        }

    } catch (error) {
        console.error('Deu ruim!');
    }
}

main();