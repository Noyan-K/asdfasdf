import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BADQUERY, NOTFOUND } from 'dns';
import { User } from '../entities/user.entity';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';

describe('UsersController', () => {
  let usersController: UsersController;

  const usersTable = [
    {
      fullname: 'User Userson',
      email: 'user@gmail.com',
      password: '1234',
      id: 0,
      isActivated: false,
    },
    {
      fullname: 'User1 Userson1',
      email: 'user1@gmail.com',
      password: '1234',
      id: 1,
      isActivated: false,
    },
    {
      fullname: 'User2 Userson2',
      email: 'user2@gmail.com',
      password: '1234',
      id: 2,
      isActivated: false,
    },
  ];

  const usersRepositoryFactory = {
    find: jest.fn(() => {
      return usersTable;
    }),
    findOneBy: jest.fn((where) => {
      return usersTable.find((user) => {
        if (where?.id) {
          return user.id === where.id;
        } else if (where?.email) {
          return user.email === where.email;
        }
      });
    }),
    create: jest.fn((dto) => {
      return {
        ...dto,
      };
    }),
    save: jest.fn((dto) => {
      return {
        ...dto,
        id: expect.any(Number),
        isActivated: false,
      };
    }),
    update: jest.fn((dto) => {
      return {
        ...dto,
        id: expect.any(Number),
        isActivated: false,
      };
    }),
    remove: jest.fn((dto) => {
      return {
        ...dto,
        id: expect.any(Number),
        isActivated: false,
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          useValue: usersRepositoryFactory,
          provide: getRepositoryToken(User),
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    jest.clearAllMocks();
  });

  it('should find all users', async () => {
    expect(await usersController.findAll()).toStrictEqual(usersTable);
  });

  it('should find one user by id', async () => {
    expect(await usersController.findOne(2)).toStrictEqual(usersTable[2]);
  });

  it("shouldn't find one user by id", async () => {
    expect(await usersController.findOne(32)).toThrowError('');
  });

  it('should create a new user', async () => {
    expect(
      await usersController.create({
        fullname: 'User12 Userson12',
        email: 'user12@gmail.com',
        password: '1234',
      }),
    ).toStrictEqual({
      fullname: 'User12 Userson12',
      email: 'user12@gmail.com',
      password: '1234',
      id: expect.any(Number),
      isActivated: false,
    });
  });

  it('should update user by id', async () => {
    expect(
      await usersController.update(2, {
        fullname: 'User12 Userson12',
        email: 'user12@gmail.com',
        password: '1234',
      }),
    ).toStrictEqual(usersTable[2]);
  });

  it('should remove user by id', async () => {
    expect(await usersController.remove(2)).toStrictEqual(usersTable[2]);
  });
});