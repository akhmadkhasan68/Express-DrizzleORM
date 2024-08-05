import { db } from './connection';
import { migrate } from 'drizzle-orm/node-postgres/migrator';


const main = async () => {
    try {
        console.log('Starting migration ... 🚀');

        await migrate(db, {
            migrationsFolder: './src/databases/migrations',
        })

        console.log('Migration completed! 🎉');
      } catch (error) {
        console.error('Error running migration:', error);
        process.exit(1);
      }
}

main();
