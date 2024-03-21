// Core
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

// Entities
import { UserEntity } from '../users/user.entity';

@Entity({ name: 'phones' })
export class PhoneEntity {
  @PrimaryGeneratedColumn('uuid')
  public readonly id: string;

  @Column({ name: 'number', type: 'varchar', unique: true })
  public readonly number: string;

  @ManyToOne(() => UserEntity, (user) => user.phones, { onDelete: 'CASCADE' })
  public readonly user?: UserEntity;
}
