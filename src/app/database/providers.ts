import { ConfigService } from "@nestjs/config";
import { DataSource } from "typeorm";

export const databaseProviders = [
    {
        provide: DataSource,
        inject: [ConfigService],
        useFactory: async(configService: ConfigService) => {
            const dataSource = new DataSource({
                type: 'postgres',
                username: configService.get('DB_USERNAME'),
                password: configService.get('DB_PASSWORD'),
                host: configService.get('DB_HOST'),
                port: configService.get('DB_PORT') ? parseInt(configService.get<string>('DB_PORT')!) : 5432,
                database: configService.get('DB_NAME') ? process.env.DB_NAME : 'cmpc-libros',
                synchronize: configService.get('SYNCHRONIZE_DB', false),
                logging: true,
            });

            console.log('Conectando a DB '+`cmpc-libros -> ${dataSource.options['host']}`);
            return dataSource.initialize().catch((e)=> console.log(e));
        }
    }
]  