import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDTO } from './dto/CreateUserDTO';

@Injectable()
export class UserService {
    constructor(private readonly prismaService: PrismaService) {}


    async getUser(vkId: string) {
        return await this.prismaService.user.findFirst({where: {
            vkId: vkId,
        }});
    }


    async checkUser(vkId: string) {
        try {
            const existUser = await this.getUser(vkId);

            if (!existUser) {
                return await this.createUser(vkId);
            }

            return existUser;
        }

        catch (e) {
            console.log(e);
        }
    }


    async createUser(vkId: string) {
        try {
            return await this.prismaService.user.create({
                data: {
                    vkId: vkId
                }
            })
        }
        
        catch (e) {
            console.log(e);
        }
    }
}
