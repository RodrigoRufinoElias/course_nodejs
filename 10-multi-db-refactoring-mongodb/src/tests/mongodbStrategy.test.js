const assert = require('assert');
const MongoDB = require('../db/strategies/mongodb/mongodb');
const HeroiSchema = require('../db/strategies/mongodb/schemas/heroisSchema');
const Context = require('../db/strategies/base/contextStrategy');

let context = {};

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

describe.only('MongoDB Strategy', function () {
    this.beforeAll(async function () {
        
        const connection = MongoDB.connect();
        context = new Context(new MongoDB(connection, HeroiSchema));

        await context.create(MOCK_HEROI_DEFAULT);
        const result = await context.create(MOCK_HEROI_ATUALIZAR);
        MOCK_HEROI_ID = result.id;
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