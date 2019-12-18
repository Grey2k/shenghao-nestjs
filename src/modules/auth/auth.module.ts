import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import {JwtModule} from "@nestjs/jwt"
import {PassportModule} from "@nestjs/passport"
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports:[
    UserModule,
    PassportModule.register({
      defaultStrategy:'jwt'
    }),
    JwtModule.register({
      secretOrPrivateKey:"sadjyunbng-0=hrnasdasdlghzxhc",
      signOptions:{
        expiresIn:'12h'//12h 7d
      }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy]
})
export class AuthModule {}
