import {MigrationInterface, QueryRunner} from "typeorm";
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

export class admin1639314487638 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const password = bcrypt.hashSync('admin', 10);

        const admin = {
            id: uuid(),
            name: 'System user',
            login: 'admin',
            password,
        };
        await queryRunner.query(
          `INSERT INTO "users" VALUES ('${admin.id}', '${admin.name}', '${admin.login}', '${admin.password}')`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const admin = {
            login: 'admin',
        };
        await queryRunner.query(`DELETE FROM "users" WHERE "login" = '${admin.login}'`);
    }

}
