// FRAMEWORK MONGODB
// npm install mongoose

const Mongoose = require('mongoose');
Mongoose.connect(
    'mongodb://rodrigorufino:123mudar@192.168.99.100:27017/herois',
    { useNewUrlParser: true, useUnifiedTopology: true },
    function (error) {
        if (!error) return;
        console.log('Falha na conexão', error);        
    }
);

const connection = Mongoose.connection;

connection.once('open', () => console.log('Database rodando !!!'));

// setTimeout(() => {
//     /*
//     States:
//     0 - Desconectado
//     1 - Conectado
//     2 - Conectando
//     3 - Desconectando
//     */
//     const state = connection.readyState;
//     console.log('state', state);
// }, 1000);

const heroiSchema = new Mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    poder: {
        type: String,
        required: true
    },
    insertedAt: {
        type: Date,
        default: new Date()
    }
});

const model = Mongoose.model('herois', heroiSchema);

async function main() {
    const resultCadastrar = await model.create({
        nome: 'Batman',
        poder: 'Dinheiro'
    });

    console.log('resultCadastrar', resultCadastrar);

    const listItens = await model.find();

    console.log('listItens', listItens);
}

main();