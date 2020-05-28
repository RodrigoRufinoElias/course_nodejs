// CONVERSOR DE DADOS PARA DB
// npm install sequelize
// DRIVER DB POSTGRES
// npm install pg-hstore pg

const Sequelize = require('sequelize');

const driver = new Sequelize(
    'heroes',
    'rodrigorufino',
    '123mudar',
    {
        host: '192.168.99.100',
        dialect: 'postgres',
        quoteIdentifiers: false,
        operatorAliases: false,
        omitNull: true
    }
);

async function main() {
    try {
        const Herois = driver.define('herois', {
            id: {
                type: Sequelize.INTEGER,
                required: true,
                primaryKey: true,
                autoincrement: true
            },
            nome: {
                type: Sequelize.STRING,
                required: true
            },
            poder: {
                type: Sequelize.STRING,
                required: true
            }
        }, {
            tableName: 'TB_HEROIS',
            freezeTableName: false,
            timestamps: false
        });
    
        await Herois.sync();

        // CREATE
        await Herois.create({
            nome: 'Lanterna Verde',
            poder: 'Anel'
        });
    
        // READ
        const result = await Herois.findAll({
            raw: true
        });
    
        console.log('Result', result);
    } catch (error) {
        console.error('ERRO', error);
    }
}

main();