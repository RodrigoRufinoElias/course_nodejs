const assert = require('assert');
const api = require('../api');

let app = {};

describe.only('Suite de testes da API Heroes', function () {
    this.beforeAll(async () => {
        app = await api;
    });

    it('Listar /herois', async () => {
        const result = await app.inject({
            method: 'GET',
            url: '/herois?skip=0&limit=10'
        });

        const dados = JSON.parse(result.payload);
        const statusCode = result.statusCode;
        
        assert.deepEqual(statusCode, 200);
        assert.ok(Array.isArray(dados));
    });

    it('Listar /herois - Deve retornar somente 10 registros', async () => {
        const TAM_LIM = 10;

        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=${TAM_LIM}`
        });

        const dados = JSON.parse(result.payload);        
        const statusCode = result.statusCode;
        
        assert.deepEqual(statusCode, 200);
        assert.ok(dados.length === 10);
    });

    it('Listar /herois - Deve retornar erro de validação', async () => {
        const TAM_LIM = 'AEE';

        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=${TAM_LIM}`
        });

        assert.deepEqual(result.payload, 'Erro interno no servidor');
    });

    it('Listar /herois - Deve filtrar por nome', async () => {
        const NOME = 'Batman';

        const result = await app.inject({
            method: 'GET',
            url: `/herois?skip=0&limit=10&nome=${NOME}`
        });

        const dados = JSON.parse(result.payload);
        const statusCode = result.statusCode;
        
        assert.deepEqual(statusCode, 200);
        assert.deepEqual(dados[0].nome, NOME);
    });
})