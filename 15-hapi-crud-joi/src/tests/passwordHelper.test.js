const assert = require("assert");
const PasswordHelper = require("../helpers/passwordHelper");

const SENHA = 'RodrigoR@123mudar';
const HASH = '$2b$04$82DajcKMoU/VGhQIyLEDMeFWnNuMuyFajLFUfdnBsf5rt1DdNwzim';

describe("UserHelper test suite", function () {
  it("Deve gerar um hash a partir de uma senha", async () => {
    const result = await PasswordHelper.hashPassword(SENHA);
    assert.ok(result.length > 10);
  });

  it("Deve comparar uma senha e seu hash", async () => {
    const result = await PasswordHelper.comparePassword(SENHA, HASH);
    assert.ok(result);
  });
});