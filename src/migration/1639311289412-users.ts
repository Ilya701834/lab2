import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class users1639311289412 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
              name: 'users',
              columns: [
                  {
                      name: 'id',
                      generationStrategy: 'uuid',
                      isGenerated: true,
                      type: 'uuid',
                      isPrimary: true,
                  },
                  {
                      name: 'name',
                      type: 'varChar',
                  },
                  {
                      name: 'login',
                      type: 'varChar',
                  },
                  {
                      name: 'password',
                      type: 'varChar',
                  },
              ],
          }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }

}
