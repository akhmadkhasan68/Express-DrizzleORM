import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    schema: './src/databases/schema.ts',
    out: './src/databases/migrations',
    dialect: 'postgresql', // 'postgresql' | 'mysql' | 'sqlite'
    dbCredentials: {
        host: 'localhost',
        port: 5432,
        user: 'postgres',
        password: '123a123',
        database: 'research-drizzle',
    }
});
