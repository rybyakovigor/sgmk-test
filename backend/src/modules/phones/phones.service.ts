// Core
import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { EntityManager } from 'typeorm';

// Entity
import { PhoneEntity } from './phone.entity';

// Repository
import { PhonesRepository } from './phones.repository';

// Dto
import { CreatePhoneDto } from './dto/create-phone.dto';
import { UpdatePhoneDto } from './dto/update-phone.dto';

@Injectable()
export class PhonesService {
  public constructor(private phonesRepository: PhonesRepository) {}

  public async create(phone: CreatePhoneDto, tx?: EntityManager): Promise<PhoneEntity> {
    try {
      return await this.phonesRepository.createOrUpdate(phone, tx);
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  public async update(id: string, data: UpdatePhoneDto, tx?: EntityManager): Promise<PhoneEntity> {
    await this.checkExists(id);
    try {
      return await this.phonesRepository.createOrUpdate(data, tx);
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  public async delete(id: string, tx?: EntityManager): Promise<void> {
    await this.checkExists(id);
    try {
      await this.phonesRepository.delete(id, tx);
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  private async checkExists(id: string, tx?: EntityManager): Promise<PhoneEntity> {
    try {
      const phone = await this.phonesRepository.findById(id, tx);
      if (!phone) {
        throw new NotFoundException(`Phone with id ${id} not found`);
      }

      return phone;
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }
}
