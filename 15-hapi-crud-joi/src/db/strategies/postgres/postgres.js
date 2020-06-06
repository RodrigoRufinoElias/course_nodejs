const ICrud = require('../interfaces/interface.crud');
const Sequelize = require('sequelize');

class Postgres extends ICrud {
    constructor(connection, schema) {
        super();
        this._schema = schema;
        this._connection = connection;
      }

    async isConnected() {
        try {
            await this._connection.authenticate();
            return true;
        } catch (error) {
            console.log('Fail!', error);
            return false;
        }
    }

    static async connect() {
        const connection = new Sequelize(
            process.env.POSTGRES_URL,
            {
                quoteIdentifiers: false,
                operatorAliases: false,
                omitNull: true,
                logging: false,
                ssl: process.env.SSL_DB,
                dialectOptions: {
                    ssl: process.env.SSL_DB
                }
            }
        );

        return connection;
    }

    static async defineModel(connection, schema) {
        const model = connection.define(
            schema.name, schema.schema, schema.options
        );

        await model.sync();
        return model;
    }

    async create(item) {
        const { dataValues } = await this._schema.create(item);
        return dataValues;
    }

    async read(item = {}) {
        return await this._schema.findAll({where: item, raw: true});
    }

    async update(id, item, upsert = false) {
        const fn = upsert ? 'upsert' : 'update';
        
        return await this._schema[fn](item, {where: {id}});
    }

    async delete(id) {
        const query = id ? {id} : {};
        return await this._schema.destroy({where: query});
    }
}

module.exports = Postgres;