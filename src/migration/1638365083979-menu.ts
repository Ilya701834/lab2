import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class menu1638365083979 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

        await queryRunner.createTable(
          new Table({
              name: 'menus',
              columns: [
                  {
                      name: 'id',
                      generationStrategy: 'uuid',
                      isGenerated: true,
                      type: 'uuid',
                      isPrimary: true,
                      default: `uuid_generate_v4()`,
                  },
                  {
                      name: 'title',
                      type: 'varChar',
                  },
                  {
                      name: 'photo',
                      type: 'varChar',
                  },
                  {
                      name: 'isPublish',
                      type: 'boolean',
                  },
              ],
          }),
        );
    }

    // eslint-disable-next-line class-methods-use-this
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }

}
