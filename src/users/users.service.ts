import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {

    private users = [
        {
            "id": 1,
            "name": "Tuan anh 1",
            "email": "nguyentuananh98software@gmail.com",
            "role": "SENIOR 1"
        },
        {
            "id": 2,
            "name": "Tuan anh 2",
            "email": "nguyentuananh98software@gmail.com",
            "role": "SENIOR 2"
        },
        {
            "id": 3,
            "name": "Tuan anh 3",
            "email": "nguyentuananh98software@gmail.com",
            "role": "SENIOR 3"
        },
        {
            "id": 4,
            "name": "Tuan anh 4",
            "email": "nguyentuananh98software@gmail.com",
            "role": "MIDDLE"
        },
        {
            "id": 5,
            "name": "Tuan anh 5",
            "email": "nguyentuananh98software@gmail.com",
            "role": "SOLUTION ARCHITECTURE"
        },
    ]
    findAll(role?: 'SENIOR 1' | 'SENIOR 2' | 'SENIOR 3' | 'MIDDLE-'){
        if (role) {
            const rolesArray =  this.users.filter(user => user.role === role)
            if (rolesArray.length === 0) throw new NotFoundException('Role Not Found')
            return rolesArray
        }
        return this.users;
    }
    
    findOne(id: number) {
        const user = this.users.find(user => user.id === id)

        if (!user) throw new NotFoundException('User Not Found')

        return user;
    }

    create(createUserDto: CreateUserDto) {
        const usersByHighestId = [...this.users].sort((a,b) => b.id - a.id)

        const newUser = {
            id: usersByHighestId[0].id + 1,
            ...createUserDto
        }
        this.users.push(newUser)
        return newUser;
    }

    update(id: number, updateUserDto: UpdateUserDto) {
            this.users = this.users.map(user => {
                if (user.id == id) {
                    return {...user, ...updateUserDto}
                }
                return user;
            })
            return this.findOne(id);
    }
    delete(id: number) {
        const removedUser = this.findOne(id)

        this.users = this.users.filter(user => user.id !== id)
        return removedUser;
    }

}
