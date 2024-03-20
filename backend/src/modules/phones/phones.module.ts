// Core
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Repository
import { PhonesRepository } from './phones.repository';

// Entity
import { PhoneEntity } from './phone.entity';

// Services
import { PhonesService } from './phones.service';

@Module({
  imports: [TypeOrmModule.forFeature([PhoneEntity])],
  providers: [PhonesRepository, PhonesService],
  exports: [PhonesService],
})
export class PhonesModule {}
