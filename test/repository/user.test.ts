
import { RegisterRequest } from "../../src/model/user-model";
import { UserRepository } from "../../src/repository/user-repository";
import { PrismaClient } from "@prisma/client";

jest.mock('@prisma/client', () => {
    const mPrismaClient = {
        user: {
            count: jest.fn(),
          
        },
    
    };
    return { PrismaClient: jest.fn(() => mPrismaClient) };
});

  describe('UserRepository', () => {

    let prismaClient;

    beforeAll(() => {
        prismaClient = new PrismaClient();

    });

    afterEach(() => {
      jest.clearAllMocks();
    });
  
    describe('userIsExsist', () => {
      it('should return true if the user exists', async () => {
        const req: RegisterRequest = { username: 'testuser', password: 'password123', email: 'test@example.com', phone_number: '1234567890' };
        (prismaClient.user.count as jest.Mock).mockResolvedValue(1);
  
        const result = await UserRepository.userIsExsist(req);
  
        expect(prismaClient.user.count).toHaveBeenCalledWith({
          where: { phone_number: req.phone_number },
        });
        expect(result).toBe(true);
      });
  
      it('should return false if the user does not exist', async () => {
        const req: RegisterRequest = { username: 'testuser', password: 'password123', email: 'test@example.com', phone_number: '1234567890' };
        (prismaClient.user.count as jest.Mock).mockResolvedValue(0);
  
        const result = await UserRepository.userIsExsist(req);
  
        expect(prismaClient.user.count).toHaveBeenCalledWith({
          where: { phone_number: req.phone_number },
        });
        expect(result).toBe(false);
      });
  
      it('should handle errors', async () => {
        const req: RegisterRequest = { username: 'testuser', password: 'password123', email: 'test@example.com', phone_number: '1234567890' };
        const errorMessage = 'Database error';
        (prismaClient.user.count as jest.Mock).mockRejectedValue(new Error(errorMessage));
  
        await expect(UserRepository.userIsExsist(req)).rejects.toThrow(errorMessage);
        expect(prismaClient.user.count).toHaveBeenCalledWith({
          where: { phone_number: req.phone_number },
        });
      });
    });
  });