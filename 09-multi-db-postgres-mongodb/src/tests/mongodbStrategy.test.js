const assert = require('assert');
const MongoDB = require('../db/strategies/mongodb');
const Context = require('../db/strategies/base/contextStrategy');

const context = new Context(new MongoDB());

const MOCK_HEROI_CADASTRAR = {
    nome: 'Gavião Negro',
    poder: 'Flechas'
}

const MOCK_HEROI_DEFAULT = {
    nome: `Homem Aranha-${Date.now()}`,
    poder: 'Super Teia'
}

const MOCK_HEROI_ATUALIZAR = {
    nome: 'Hulk',
    poder: 'Força'
}

let MOCK_HEROI_ID;

describe('MongoDB Strategy', function () {
    // this.timeout(Infinity);

    this.beforeAll(async function () {
        await context.connect();
        await context.create(MOCK_HEROI_DEFAULT);
        const result = await context.create(MOCK_HEROI_ATUALIZAR);
        MOCK_HEROI_ID = result.id;
    //     await context.delete();
    })

    it('MongoDB Connection', async function () {
        const result = await context.isConnected(); 
        const expected = 'Conectado';

        assert.equal(result, expected);
    })

    it('Cadastrar', async function () {
        const { nome, poder } = await context.create(MOCK_HEROI_CADASTRAR);
               
        assert.deepEqual({ nome, poder }, MOCK_HEROI_CADASTRAR);
    });

    it('Listar', async function () {
        const [{ nome, poder }] = await context.read({nome: MOCK_HEROI_DEFAULT.nome});
               
        assert.deepEqual({ nome, poder }, MOCK_HEROI_DEFAULT);
    });

    it('Atualizar', async function () {
        const result = await context.update(
            MOCK_HEROI_ID,
            {nome: 'Superman'}
        ); 
        
        assert.deepEqual(result.nModified, 1 );
    });

    it('Deletar por id', async function () {
        const result = await context.delete(MOCK_HEROI_ID);

        assert.deepEqual(result.n, 1);
    });
})