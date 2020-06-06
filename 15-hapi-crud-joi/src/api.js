// npm i hapi
// npm i vision inert hapi-swagger@9.1.3
// npm i hapi-auth-jwt2@8.2.0
// npm i bcrypt

const { config } = require('dotenv');
const { join } = require('path');
const { ok } = require('assert');

const env = process.env.NODE_ENV || "dev";

ok(env === 'prod' || env === 'dev', 'A env é inválida. Ou dev ou prod');

const configPath = join(__dirname, './config', `.env.${env}`);

config({
    path: configPath
});

const Hapi = require('hapi');
const Context = require('./db/strategies/base/contextStrategy');
const MongoDB = require('./db/strategies/mongodb/mongodb');
const Postgres = require('./db/strategies/postgres/postgres');
const HeroiSchema = require('./db/strategies/mongodb/schemas/heroisSchema');
const UsuarioSchema = require('./db/strategies/postgres/schemas/usuarioSchema');
const HeroRoute = require('./routes/heroRoutes');
const AuthRoute = require('./routes/authRoutes');

const HapiSwagger = require('hapi-swagger');
const Inert = require('inert');
const Vision = require('vision');

const HapiJwt = require('hapi-auth-jwt2');
const JWT_SECRET = process.env.JWT_KEY;

const app = new Hapi.Server({
    port: process.env.PORT
});

function mapRoutes(instance, methods) {
    return methods.map(method => instance[method]());
}

async function main() {
    const connection = MongoDB.connect();
    const context = new Context(new MongoDB(connection, HeroiSchema));
    
    const connectionPostGres = await Postgres.connect();
    const usuarioSchema = await Postgres.defineModel(connectionPostGres, UsuarioSchema);
    const contextPostGres = new Context(new Postgres(connectionPostGres, usuarioSchema));

    const swaggerOptions = {
        info: {
            title: 'API Herois - #CursoNodeBr',
            version: 'v1.0'
        },
        lang: 'pt'
    };

    await app.register([
        HapiJwt,
        Vision,
        Inert,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);

    app.auth.strategy('jwt', 'jwt', {
        key: JWT_SECRET,
        // options: {
        //     expiresIn: 20
        // },
        validate: async (dado, request) => {
            // Verifica no banco se usuário continua ativo
            // Verifica no banco se usuário continua pagando

            const [result] = await contextPostGres.read({
                username: dado.username.toLowerCase()
            });

            if (!result) {
                return {
                    isValid: false
                }
            }

            return {
                isValid: true
            }
        }
    });

    app.auth.default('jwt');
    
    app.route([
        ...mapRoutes(new HeroRoute(context), HeroRoute.methods()),
        ...mapRoutes(new AuthRoute(JWT_SECRET, contextPostGres), AuthRoute.methods()),
    ]);

    await app.start();

    console.log('Servidor rodando na porta', app.info.port);
    
    return app;
}

module.exports = main();