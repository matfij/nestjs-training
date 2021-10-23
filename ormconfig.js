var ormConfig = {
    synchronize: false,
    migrations: ['migrations/*.js'],
    cli: {
        migrationsDir: 'migrations',
    },
};

switch(process.env.NODE_ENV) {
    case 'dev': {
        Object.assign(ormConfig, {
            type: 'sqlite',
            database: 'db.dev.sqlite',
            entities: ['**/*.entity.js'],
        });
        break;
    }
    case 'test': {
        Object.assign(ormConfig, {
            type: 'sqlite',
            database: 'db.test.sqlite',
            entities: ['**/*.entity.ts'],
        });
        break;
    }
    case 'prod': {
        Object.assign(ormConfig, {
            type: 'sqlite',
            database: 'sb.sqlite',
            entities:[ '**/*.entity.js'],
        });
        break;
    }
    default: 
        throw new Error('Environment not set');
}

module.exports = ormConfig;
