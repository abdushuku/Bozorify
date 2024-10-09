import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity'; // Assuming you have a User entity

// Create a mock repository
const mockUserRepository = {
  find: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  // Add any other method you want to mock
};

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User), // Provide the mock repository using TypeORM's getRepositoryToken
          useValue: mockUserRepository, // Pass the mock repository here
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Additional tests can go here
});
