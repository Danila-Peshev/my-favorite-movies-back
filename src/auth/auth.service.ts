import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { AuthResponse } from './gql-classes/AuthResponse';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string): Promise<AuthResponse> {
    const user = await this.userService.findByEmail(email);
    const isPasswordEquals = password === user?.password;
    if (!user || !isPasswordEquals) {
      throw new Error('Invalid credentials');
    }
    const payload = { id: user.id, email };

    return { token: this.jwtService.sign(payload), userId: user.id, email };
  }
}
