const assert = require('assert');
const MongoDB = require('../db/strategies/mongodb');
const Context = require('../db/strategies/base/contextStrategy');

const context = new Context(new MongoDB());

// const MOCK_HEROI_CADASTRAR = {
//     nome: 'Gavião Negro',
//     poder: 'Flechas'
// }

// const MOCK_HEROI_ATUALIZAR = {
//     nome: 'Hulk',
//     poder: 'Força'
// }

describe('MongoDB Strategy', function () {
    // this.timeout(Infinity);

    this.beforeAll(async function () {
        await context.connect();
    //     await context.delete();
    //     await context.create(MOCK_HEROI_ATUALIZAR);
    })

    it('MongoDB Connection', async function () {
        const result = await context.isConnected(); 
        const expected = 'Conectado';

        assert.equal(result, expected);
    })

    // it('Cadastrar', async function () {
    //     const result = await context.create(MOCK_HEROI_CADASTRAR); 
    //     delete result.id;
               
    //     assert.deepEqual(result, MOCK_HEROI_CADASTRAR);
    // });

    // it('Listar', async function () {
    //     const [result] = await context.read({nome: MOCK_HEROI_CADASTRAR.nome}); 
    //     delete result.id;
               
    //     assert.deepEqual(result, MOCK_HEROI_CADASTRAR);
    // });

    // it('Atualizar', async function () {
    //     const [itemAtualizar] = await context.read({nome: MOCK_HEROI_ATUALIZAR.nome});

    //     // Técnica JS REST/Spread para merge ou separar objetos
    //     const novoItem = {
    //         ...MOCK_HEROI_ATUALIZAR,
    //         nome: 'Mulher Maravilha'
    //     };

    //     const [result] = await context.update(itemAtualizar.id, novoItem); 
    //     const [itemAtualizado] = await context.read({id: itemAtualizar.id});

    //     assert.deepEqual(result, 1);
    //     assert.deepEqual(itemAtualizado.nome, novoItem.nome );
    // });

    // it('Deletar por id', async function () {
    //     const [item] = await context.read({});
    //     const result = await context.delete(item.id);

    //     assert.deepEqual(result, 1);
    // });
})