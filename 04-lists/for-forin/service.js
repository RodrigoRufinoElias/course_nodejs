const axios = require('axios');

const URL = 'https://swapi.dev/api/people';

async function obterPessoas(nome) {
    // const url = `${URL}/${nome}`;
    const url = `${URL}`;
    const response = await axios.get(url)

    return response.data;
}

module.exports = {
    obterPessoas
}