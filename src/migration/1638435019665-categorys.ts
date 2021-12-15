import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class categorys1638435019665 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
              name: 'categories',
              columns: [
                  {
                      name: 'id',
                      generationStrategy: 'uuid',
                      isGenerated: true,
                      type: 'uuid',
                      isPrimary: true,
                  },
                  {
                      name: 'menuId',
                      type: 'text',
                      isNullable: true,
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
                      name: 'isVisible',
                      type: 'boolean',
                  },
              ],
          }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('categories');
    }

}
