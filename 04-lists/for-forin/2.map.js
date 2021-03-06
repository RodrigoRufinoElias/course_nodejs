const service = require('./service');

async function main() {
    try {
        const result = await service.obterPessoas('1');

        // const names = [];

        // result.results.forEach(function (item) {
        //     names.push(item.name);
        // });

        // const names = result.results.map(function (pessoa) {
        //     return pessoa.name;
        // });

        const names = result.results.map((pessoa) => pessoa.name);

        console.log(names);

    } catch (error) {
        console.log('Erro interno', error);
    }
}

main();