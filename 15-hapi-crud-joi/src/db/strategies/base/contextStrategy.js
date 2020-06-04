const ICrud = require('../interfaces/interface.crud')

class ContextStrategy extends ICrud {
    constructor(strategy) {
        super();
        this._database = strategy;
    }

    async create(item) {
        return await this._database.create(item);
    }
    
    async read(item, skip, limit) {
        return await this._database.read(item, skip, limit);
    }
    
    async update(id, item, upsert) {
        return await this._database.update(id, item, upsert);
    }
    
    async delete(id) {
        return await this._database.delete(id);
    }
    
    async isConnected() {
        return await this._database.isConnected();
    }

    static connect() {
        return this._database.connect();
    }
}

module.exports = ContextStrategy;