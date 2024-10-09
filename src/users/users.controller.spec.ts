import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User } from './entities/user.entity'; // Assuming you have a User entity

const mockUserRepository = {
  find: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  // Add any other method you want to mock
};

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        }
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
