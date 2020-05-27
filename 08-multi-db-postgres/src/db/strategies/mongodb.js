const ICrud = require('./interfaces/interface.crud')

class MongoDB extends ICrud {
    constructor() {
        super();
    }

    create(item) {
        console.log('O item foi salvo em MongoDb');
    }
}

module.exports = MongoDB;