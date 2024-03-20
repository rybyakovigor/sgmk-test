// Core
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

// Entity
import { UserEntity } from './user.entity';

// Dto
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersRepository {
  public constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>
  ) {}

  private getRepository(tx?: EntityManager): Repository<UserEntity> {
    return tx?.getRepository(UserEntity) || this.usersRepository;
  }

  public async findAll(): Promise<[UserEntity[], number]> {
    return this.usersRepository.findAndCount();
  }

  public async findById(id: string, tx?: EntityManager): Promise<UserEntity | null> {
    return this.getRepository(tx).findOneBy({ id });
  }

  public async create(user: CreateUserDto, tx?: EntityManager): Promise<UserEntity> {
    return this.getRepository(tx).save(user);
  }

  public async update(id: string, user: UpdateUserDto, tx?: EntityManager): Promise<UserEntity> {
    await this.getRepository(tx).update(id, user);
    return this.getRepository(tx).findOne({ where: { id } }) as unknown as UserEntity;
  }

  public async delete(id: string, tx?: EntityManager): Promise<void> {
    await this.getRepository(tx).delete({ id });
  }
}
