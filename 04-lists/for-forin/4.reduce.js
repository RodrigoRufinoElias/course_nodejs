const { obterPessoas } = require('./service');

async function main() {
    try {
        const { results } = await obterPessoas('1');

        const altura = results.map((pessoa) => parseInt(pessoa.height));

        console.log('altura', altura);

        const total = altura.reduce((anterior, proximo) => {
            return anterior + proximo;
        })

        console.log('total', total);

    } catch (error) {
        console.log('Erro interno', error);
    }
}

main();