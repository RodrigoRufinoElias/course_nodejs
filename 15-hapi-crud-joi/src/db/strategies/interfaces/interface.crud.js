class NotImplementedException extends Error {
    constructor() {
        super('Not Implemented Exception');
    }
}

class ICrud {
    create(item) {
        throw new NotImplementedException();
    }
    
    read(query) {
        throw new NotImplementedException();
    }
    
    update(id, item, upsert) {
        throw new NotImplementedException();
    }
    
    delete(id) {
        throw new NotImplementedException();
    }
    
    isConnected() {
        throw new NotImplementedException();
    }
    
    connect() {
        throw new NotImplementedException();
    }
}

module.exports = ICrud;