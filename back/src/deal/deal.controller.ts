import { Body, Controller, Post } from '@nestjs/common';
import { DealService } from './deal.service';
import { CreateDealDTO } from './dto/CreateDealDTO';

@Controller('deal')
export class DealController {
    constructor(private readonly dealService: DealService) {}


    @Post("createDeal") 
    async CreateDeal(@Body() data: CreateDealDTO) {
        return this.dealService.createDeal(data);
    }
}
