// Core
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

// Entity
import { PhoneEntity } from './phone.entity';

// Dto
import { CreatePhoneDto } from './dto/create-phone.dto';
import { UpdatePhoneDto } from './dto/update-phone.dto';

@Injectable()
export class PhonesRepository {
  public constructor(
    @InjectRepository(PhoneEntity)
    private phonesRepository: Repository<PhoneEntity>
  ) {}

  private getRepository(tx?: EntityManager): Repository<PhoneEntity> {
    return tx?.getRepository(PhoneEntity) || this.phonesRepository;
  }

  public async findById(id: string, tx?: EntityManager): Promise<PhoneEntity | null> {
    return this.getRepository(tx).findOneBy({ id });
  }

  public async createOrUpdate(phone: CreatePhoneDto | UpdatePhoneDto, tx?: EntityManager): Promise<PhoneEntity> {
    const row = await this.getRepository().upsert(phone, {
      conflictPaths: ['id'],
      skipUpdateIfNoValuesChanged: true,
    });
    return this.findById(row.identifiers[0].id, tx) as unknown as PhoneEntity;
  }

  public async delete(id: string, tx?: EntityManager): Promise<void> {
    await this.getRepository(tx).delete({ id });
  }
}
