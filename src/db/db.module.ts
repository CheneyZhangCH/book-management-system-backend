import { Module } from '@nestjs/common';
import { DbService } from './db.service';

@Module({})
export class DbModule {
  static register(options: { path: string }) {
    return {
      module: DbModule,
      providers: [
        {
          provide: 'DB_OPTIONS',
          useValue: options,
        },
        DbService,
      ],
      exports: [DbService],
    };
  }
}
