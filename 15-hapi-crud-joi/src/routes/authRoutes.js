// npm i jsonwebtoken

const Joi = require('joi');
const Boom = require('boom');
const Jwt = require('jsonwebtoken');
const BaseRoute = require('./base/baseRoute');
const PasswordHelper = require('../helpers/passwordHelper');

const failAction = (request, headers, erro) => {
    throw erro;
}

const USER = {
    username: 'rodrigorufino',
    password: '123mudar'
};

class AuthRoutes extends BaseRoute {
    constructor(secret, db) {
        super();
        this.secret = secret;
        this.db = db;
    }

    login() {
        return {
            path: '/login',
            method: 'POST',
            config: {
                auth: false,
                tags: ['api'],
                description: 'Obter token',
                notes: 'Login com username e password',
                validate: {
                    failAction,
                    payload: {
                        username: Joi.string().required(),
                        password: Joi.string().required()
                    }
                }
            },
            handler: async (request) => {
                try {
                    const { username, password } = request.payload;

                    const [usuario] = await this.db.read({
                        username: username.toLowerCase()
                    });

                    if (!usuario) return Boom.unauthorized('O usuário informado não existe!');

                    const match = await PasswordHelper.comparePassword(password, usuario.password);

                    if (!match) return Boom.unauthorized('Usuário ou senha inválidos!');
                    
                    // if (username.toLowerCase() !== USER.username || password !== USER.password)
                    //     return Boom.unauthorized();

                    const token = Jwt.sign({
                        username: username,
                        id: usuario.id
                    }, this.secret);
                    
                    return { token };

                } catch (error) {
                    return Boom.internal();
                }
            }
        }
    }
}

module.exports = AuthRoutes;