const service = require('./service');

async function main() {
    try {
        const result = await service.obterPessoas('1');

        const names = [];

        // FOR
        console.time('for');
        for (let i = 0; i < result.results.length - 1; i++) {
            const pessoa = result.results[i];
            names.push(pessoa.name);
        }
        console.timeEnd('for');

        // FOR IN
        console.time('forIn');
        for (let i in result.results) {
            const pessoa = result.results[i];
            names.push(pessoa.name);
        }
        console.timeEnd('forIn');

        // FOR OF
        console.time('forOf');
        for (pessoa of result.results) {
            names.push(pessoa.name);
        }
        console.timeEnd('forOf');

        console.log(names);
        
    } catch (error) {
        console.log('Erro interno', error);
    }
}

main();