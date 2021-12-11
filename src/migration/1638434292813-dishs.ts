import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class dishs1638434292813 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
              name: 'dishes',
              columns: [
                  {
                      name: 'id',
                      generationStrategy: 'uuid',
                      isGenerated: true,
                      type: 'uuid',
                      isPrimary: true,
                  },
                  {
                      name: 'categoryId',
                      type: 'text',
                      isNullable: true,
                  },
                  {
                      name: 'title',
                      type: 'varChar',
                  },
                  {
                      name: 'description',
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
                  {
                      name: 'ingredients',
                      type: 'jsonb',
                  },
                  {
                      name: 'price',
                      type: 'int',
                  },
              ],
          }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('dishes');
    }

}
