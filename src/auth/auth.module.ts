import { Module } from '@nestjs/common';
import { UserModule } from "src/user/user.module";
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';

@Module({
  controllers: [],
  providers: [AuthService, AuthResolver],
  imports: [UserModule],
})
export class AuthModule {}