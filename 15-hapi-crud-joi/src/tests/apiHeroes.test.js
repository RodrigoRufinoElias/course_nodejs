const assert = require("assert");
const api = require("../api");

let app = {};

const MOCK_HEROI_CADASTRAR = {
    nome: 'Chapolin Colorado',
    poder: 'Marreta Biônica'
}

describe.only("Suite de testes da API Heroes", function () {
  this.beforeAll(async () => {
    app = await api;
  });

  it("Listar /herois", async () => {
    const result = await app.inject({
      method: "GET",
      url: "/herois?skip=0&limit=10",
    });

    const dados = JSON.parse(result.payload);
    const statusCode = result.statusCode;

    assert.deepEqual(statusCode, 200);
    assert.ok(Array.isArray(dados));
  });

  it("Listar /herois - Deve retornar somente 10 registros", async () => {
    const TAM_LIM = 10;

    const result = await app.inject({
      method: "GET",
      url: `/herois?skip=0&limit=${TAM_LIM}`,
    });

    const dados = JSON.parse(result.payload);
    const statusCode = result.statusCode;

    assert.deepEqual(statusCode, 200);
    assert.ok(dados.length === 10);
  });

  it("Listar /herois - Deve retornar erro de validação", async () => {
    const TAM_LIM = "AEE";

    const result = await app.inject({
      method: "GET",
      url: `/herois?skip=0&limit=${TAM_LIM}`,
    });

    const errorResult = {
      statusCode: 400,
      error: "Bad Request",
      message: 'child "limit" fails because ["limit" must be a number]',
      validation: { source: "query", keys: ["limit"] },
    };

    assert.deepEqual(result.statusCode, 400);
    assert.deepEqual(result.payload, JSON.stringify(errorResult));
  });

  it("Listar /herois - Deve filtrar por nome", async () => {
    const NOME = "Batman";

    const result = await app.inject({
      method: "GET",
      url: `/herois?skip=0&limit=10&nome=${NOME}`,
    });

    const dados = JSON.parse(result.payload);
    const statusCode = result.statusCode;

    assert.deepEqual(statusCode, 200);
    assert.deepEqual(dados[0].nome, NOME);
  });

  it("Cadastrar /herois", async function () {
    const result = await app.inject({
      method: "POST",
      url: `/herois`,
      payload: JSON.stringify(MOCK_HEROI_CADASTRAR)
    });

    const { message, _id } = JSON.parse(result.payload);
    const statusCode = result.statusCode;

    assert.ok(statusCode === 200);
    assert.notStrictEqual(_id, undefined);
    assert.deepEqual(message, 'Heroi cadastrado com sucesso!');
  });
});
