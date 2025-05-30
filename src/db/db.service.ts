import { Inject, Injectable } from '@nestjs/common';

import { access, readFile, writeFile } from 'fs/promises';

@Injectable()
export class DbService {
  @Inject('DB_OPTIONS')
  private readonly options: { path: string };

  async read() {
    // Implementation for writing data to the database
    const path = this.options.path;
    try {
      await access(path);
    } catch (error) {
      console.error('Error writing to database:', error);
      return [];
    }

    const str = await readFile(path, {
      encoding: 'utf-8',
    });

    if (!str) {
      return [];
    }

    return JSON.parse(str);

    console.log(`Writing to database at path: ${path}`);
  }

  async write(obj: Record<string, any>) {
    await writeFile(this.options.path, JSON.stringify(obj, null, 2), {
      encoding: 'utf-8',
    });
  }
}
