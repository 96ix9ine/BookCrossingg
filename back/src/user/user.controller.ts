import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/CreateUserDTO';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}


    @Get("getUser")
    async GetUser(vkId: string) {
        return this.userService.getUser(vkId);
    }


    @Post("createUser")
    async CheckUser(@Body() data: CreateUserDTO) {
        return this.userService.checkUser(data.vkId);
    }
}
