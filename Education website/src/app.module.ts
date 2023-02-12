import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CourseModule } from './course/course.module';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cource } from './course/course.entity';


@Module({
  imports: [UserModule,CourseModule, AuthModule, PrismaModule,
    ConfigModule.forRoot({
      isGlobal:true}),
     TypeOrmModule.forRoot({  
      type:'mysql',
     host:'localhost',
     port:3306,
     username:'yeneta',
     password:'0000',
     database:'yeneta',
     entities:[Cource],
     synchronize:true,
   })
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService,JwtService],
})
export class AppModule {}
