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
            migrationsRun: true,
        });
        break;
    }
    case 'prod': {
        Object.assign(ormConfig, {
            type: 'postgres',
            url: process.env.DATABASE_URL,
            entities:[ '**/*.entity.js'],
            migrationsRun: true,
            ssl: {
                rejectUnauthorized: false,
            },
        });
        break;
    }
    case 'gen': {
        Object.assign(ormConfig, {
            type: 'sqlite',
            database: 'db.gen.sqlite',
            entities: ['**/*.entity.ts'],
            migrationsRun: true,
        });
        break;
    }
    default: 
        throw new Error('Environment not set');
}

module.exports = ormConfig;
