import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async login(userDto: CreateUserDto) {
    const user = this.validateUser(userDto);
    return user;
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.findByEmail(userDto.email);
    const passwordEquals = userDto.password === user?.password;
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException();
  }
}
