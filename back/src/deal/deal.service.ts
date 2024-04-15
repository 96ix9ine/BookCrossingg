import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDealDTO } from './dto/CreateDealDTO';

@Injectable()
export class DealService {
    constructor(private readonly prismaService: PrismaService) {}


    async createDeal(data: CreateDealDTO) {
        return await this.prismaService.deal.create({
            data: {
                userId: data.userId,
                bookId: data.bookId
            }
        })
    }
}
