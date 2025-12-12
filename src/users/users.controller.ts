import { Body, Controller, Delete, Get, Param, Patch, Post, Query,
    ParseIntPipe, ValidationPipe
 } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto} from './dto/update-user.dto';

@Controller('users')
export class UsersController {
        constructor(private readonly userService: UsersService){}
    /*
    GET /users
    GET /users/:id
    POST /users
    PATCH /users:id
    DELETE /users:id
    */

    @Get() // GET /users or /users?role=value&age=value
    findAll(@Query('role') role?: 'SENIOR 1' | 'SENIOR 2' | 'SENIOR 3'| 'MIDDLE-') {
        return this.userService.findAll(role)
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number){
        return this.userService.findOne(id);
    }

    @Post()
    create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }
    
    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body(ValidationPipe) userUpdate: UpdateUserDto){
        return this.userService.update(id, userUpdate)
    }

    @Delete(':id')
    delete(@Param('id') id: string){
        return this.userService.delete(+id);
    }
}
