// Core
import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

@Injectable()
export class TransactionService {
  public constructor(private entityManager: EntityManager) {}

  public async transaction<T>(cb: (transactionManager: EntityManager) => Promise<T>): Promise<T> {
    const queryRunner = this.entityManager.connection.createQueryRunner();
    await queryRunner.connection.createQueryRunner().connect();
    await queryRunner.startTransaction();

    try {
      const result = await cb(queryRunner.manager);
      await queryRunner.commitTransaction();
      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
