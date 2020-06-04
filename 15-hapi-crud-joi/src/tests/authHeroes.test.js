const assert = require("assert");
const api = require("../api");
const Postgres = require('../db/strategies/postgres/postgres');
const Context = require('../db/strategies/base/contextStrategy');
const UsuarioSchema = require('../db/strategies/postgres/schemas/usuarioSchema');

let app = {};

const USER = {
  username: 'rodrigorufino',
  password: '123mudar'
};

const USER_DB = {
  username: USER.username.toLowerCase(),
  password: '$2b$04$7SVxWG6cW0b0DZRaUL7qT.Cn0pbMfR/02oOk0JH423SuGrEOMmNcu'
};

describe("Auth test suite", function () {
  this.beforeAll(async () => {
    
    app = await api;
    
    const connection = await Postgres.connect();
    const model = await Postgres.defineModel(connection, UsuarioSchema);
    const context = new Context(new Postgres(connection, model));
    // await context.update(null, USER_DB, true);
  });

  it("Deve obter um token", async () => {
    const result = await app.inject({
      method: "POST",
      url: "/login",
      payload: USER
    });

    const statusCode = result.statusCode;
    const dados = JSON.parse(result.payload);

    assert.deepEqual(statusCode, 200);
    assert.ok(dados.token.length > 10);
  });

  it("Deve retornar não autorizado ao obter um login", async () => {
    const result = await app.inject({
      method: "POST",
      url: "/login",
      payload: {
        username: 'rodrigorufino',
        password: '123'
      }
    });

    const statusCode = result.statusCode;
    const dados = JSON.parse(result.payload);

    assert.deepEqual(statusCode, 401);
    assert.deepEqual(dados.error, 'Unauthorized');
  });
});