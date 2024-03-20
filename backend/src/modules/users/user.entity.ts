import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  public readonly id: string;

  @Column({ name: 'name', type: 'varchar' })
  public readonly name: string;

  @Column({ name: 'surname', type: 'varchar' })
  public readonly surname: string;

  @Column({ name: 'patronymic', type: 'varchar' })
  public readonly patronymic: string;

  @Column({ name: 'city', type: 'varchar' })
  public readonly city: string;

  @Column({ name: 'street', type: 'varchar' })
  public readonly street: string;

  @Column({ name: 'house', type: 'varchar' })
  public readonly house: string;

  @Column({ name: 'flat', type: 'int' })
  public readonly flat: number;
}