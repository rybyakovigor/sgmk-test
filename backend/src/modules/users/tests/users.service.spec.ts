import { HttpException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users.service';
import { UsersRepository } from '../users.repository';
import { PhonesService } from '@/modules/phones/phones.service';
import { FilesService } from '@/modules/files/files.service';
import { TransactionService } from '@/modules/core/modules/database/transaction.service';

describe('UsersService', () => {
  let userService: UsersService;
  let usersRepository: UsersRepository;

  const mockUser = {
    id: '55e38b80-6404-42fe-be01-6d53be38934d',
    name: 'Василий',
    surname: 'Иванович',
    patronymic: 'Иванов',
    city: 'Кемерово',
    street: 'Ленина',
    house: '23',
    flat: 32,
    avatar: null,
    phones: [
      {
        id: 'cb4adb60-85fc-4049-945f-19b27ef41e05',
        number: '+79827737771',
      },
      {
        id: '36e87d77-6947-44a4-b5cf-9bde4d30ac30',
        number: '+79827737452',
      },
    ],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersRepository,
          useFactory: () => ({
            findAll: jest.fn(),
            findById: jest.fn(),
            create: jest.fn().mockRejectedValue(mockUser),
            update: jest.fn(),
            delete: jest.fn(),
          }),
        },
        {
          provide: PhonesService,
          useFactory: () => ({
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          }),
        },
        {
          provide: FilesService,
          useFactory: () => ({
            create: jest.fn(),
            delete: jest.fn(),
          }),
        },
        {
          provide: TransactionService,
          useFactory: () => ({
            transaction: jest.fn(),
          }),
        },
      ],
    }).compile();

    userService = module.get<UsersService>(UsersService);
    usersRepository = module.get<UsersRepository>(UsersRepository);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a users list', async () => {
      jest.spyOn(usersRepository, 'findAll').mockResolvedValueOnce([[mockUser], 1]);
      const result = await userService.findAll({ limit: 1, offset: 0 });

      expect(usersRepository.findAll).toHaveBeenCalledWith({ limit: 1, offset: 0 });
      expect(result).toEqual([[mockUser], 1]);
    });
  });

  describe('findById', () => {
    // eslint-disable-next-line sonarjs/no-duplicate-string
    it('should return a user by id', async () => {
      jest.spyOn(userService, 'findById').mockResolvedValueOnce(mockUser);
      const result = await userService.findById(mockUser.id);

      expect(userService.findById).toHaveBeenCalledWith(mockUser.id);
      expect(result).toEqual(mockUser);
    });
  });

  describe('deleteById', () => {
    it('should delete a user by id', async () => {
      jest.spyOn(userService, 'delete').mockResolvedValueOnce();

      const result = await userService.delete(mockUser.id);

      expect(userService.delete).toHaveBeenCalledWith(mockUser.id);
      expect(result).toEqual(undefined);
    });
  });

  describe('checkExist', () => {
    it('should return a user by id', async () => {
      jest.spyOn(usersRepository, 'findById').mockResolvedValueOnce(mockUser);
      const result = await userService.checkExists(mockUser.id);

      expect(usersRepository.findById).toHaveBeenCalledWith(mockUser.id, undefined);
      expect(result).toEqual(mockUser);
    });

    it('should throw a NotFoundException if user is not found', async () => {
      const mockUserId = 'non-existing-id';
      jest.spyOn(usersRepository, 'findById').mockResolvedValueOnce(null);

      await expect(userService.checkExists(mockUserId)).rejects.toThrowError(
        new NotFoundException(`User with id ${mockUserId} not found`)
      );
    });

    it('should catch a HttpException if user is not found', async () => {
      jest
        .spyOn(usersRepository, 'findById')
        .mockRejectedValue(new HttpException(`User with id ${mockUser.id} not found`, 404));

      await expect(userService.findById(mockUser.id)).rejects.toThrowError(
        new HttpException(`User with id ${mockUser.id} not found`, 404)
      );
    });
  });
});
