const ICrud = require('../interfaces/interface.crud')

class ContextStrategy extends ICrud {
    constructor(strategy) {
        super();
        this._database = strategy;
    }

    async create(item) {
        return await this._database.create(item);
    }
    
    async read(item) {
        return await this._database.read(item);
    }
    
    async update(id, item) {
        return await this._database.update(id, item);
    }
    
    async delete(id) {
        return await this._database.delete(id);
    }
    
    async isConnected() {
        return await this._database.isConnected();
    }

    async connect() {
        return await this._database.connect();
    }
}

module.exports = ContextStrategy;