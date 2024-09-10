import { Injectable, UnauthorizedException } from "@nestjs/common";
import { User } from "src/user/user.entity";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async login(email: string, password: string): Promise<User> {
    const user = await this.validateUser(email, password);
    if (user) {
      return user
    } else {
      throw new UnauthorizedException();
    }
  }

  private async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findByEmail(email);
    const isPasswordEquals = password === user?.password;
    if (user && isPasswordEquals) {
      return user;
    } else {
      return null
    }
  }
}