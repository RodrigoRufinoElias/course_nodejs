const Sequelize = require('sequelize');

const UsuarioSchema = {
    name: 'usuarios',
    schema: {
        id: {
            type: Sequelize.INTEGER,
            required: true,
            primaryKey: true,
            autoincrement: true
        },
        username: {
            type: Sequelize.STRING,
            unique: true,
            required: true
        },
        password: {
            type: Sequelize.STRING,
            required: true
        }
    },
    options: {
        tableName: 'TB_USUARIOS',
        freezeTableName: false,
        timestamps: false
    }
}

module.exports = UsuarioSchema;