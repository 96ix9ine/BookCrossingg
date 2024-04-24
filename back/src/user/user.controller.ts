import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/CreateUserDTO';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}


    @Get("getUser/:userId")
    async GetUser(@Param('userId') userId: string) {
        return this.userService.getUser(userId);
    }


    @Get("getUserByVkId/:userId")
    async GetUserByVkId(@Param('userId') userId: string) {
        return this.userService.getUserByVkId(userId);
    }


    @Post("checkUser")
    async CheckUser(@Body() data: CreateUserDTO) {
        return this.userService.checkUser(data.vkId);
    }
}
