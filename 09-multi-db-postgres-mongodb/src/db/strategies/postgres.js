const ICrud = require('./interfaces/interface.crud');
const Sequelize = require('sequelize');

class Postgres extends ICrud {
    constructor() {
        super();
        this._driver = null;
        this._herois = null;
    }

    async isConnected() {
        try {
            await this._driver.authenticate();
            return true;
        } catch (error) {
            console.log('Fail!', error);
            return false;
        }
    }

    async connect() {
        this._driver = new Sequelize(
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

        await this.defineModel();
    }

    async defineModel() {
        this._herois = this._driver.define('herois', {
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
    
        await this._herois.sync();
    }

    async create(item) {
        const { dataValues } = await this._herois.create(item);
        return dataValues;
    }

    async read(item = {}) {
        return await this._herois.findAll({where: item, raw: true});
    }

    async update(id, item) {
        return await this._herois.update(item, {where: {id: id}});
    }

    async delete(id) {
        const query = id ? {id} : {};
        return await this._herois.destroy({where: query});
    }
}

module.exports = Postgres;