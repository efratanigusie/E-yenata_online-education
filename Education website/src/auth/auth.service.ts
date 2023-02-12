import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto, SignInDto, SignUpDto } from './dto/auth.dto';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService,
    private config: ConfigService
    ) {}


    async signUp(dto: SignUpDto) {
      // generate the password hash
      const hash = await argon.hash(dto.password);
      // save the new user in the db
      try {
        const user = await this.prisma.user.create({
          data: {
            email: dto.email,
            firstName:dto.firstName,
            lastName:dto.lastName,
            hash,
          },
        });
  
        return this.signToken(user.id, user.email);
      } catch (error) {
        if (
          error instanceof
          PrismaClientKnownRequestError
        ) {
          if (error.code === 'P2002') {
            throw new ForbiddenException(
              'Credentials taken',
            );
          }
        }
        throw error;
      }
    }

  // async signUp(dto:SignUpDto){
  //   //generate hash password
  //   const hash  = await argon.hash(dto.password)
  //   // save user
  //   try{

  //       const User = await this.prisma.user.create({
  //         data:{
              // email: dto.email,
              // firstName:dto.firstName,
              // lastName:dto.lastName,
              // hash,
  //         },
        
  //     })
  //       delete User.hash
    
  //       return User;

  //   }catch(error){

  //       if (error instanceof PrismaClientKnownRequestError){
  //           if (error.code === 'P2002') // duplicate error
  //           {
  //             throw new ForbiddenException(
  //               'Credentials taken'
  //             )
  //           }
  //           throw error
  //       }
  //   };

    
  // }

  async signIn(dto: SignInDto):Promise<boolean> {
    let isSignIn =  true
    // find the user by email
    const user =
      await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });
    // if user does not exist throw exception
    if (!user)
    {
      isSignIn =  false;
    }
      // throw new ForbiddenException(
      //   'Credentials incorrect',
      // );
      
    // compare password
    const pwMatches = await argon.verify(
      user.hash,
      dto.password,
    );
    // if password incorrect throw exception
    if (!pwMatches){
      isSignIn =  false;
    }
      // throw new ForbiddenException(
      //   'Credentials incorrect',
      // );
    // const token = await this.signToken(user.id, user.email);
    // return token
    //const user_em=user.email
    return isSignIn;
  }

//   signToken(userId: number, email: string): Promise<{access_token:string}> {
//     const payload =  {
//       sub: userId,
//       email: email
//     }

//   const secret = this.config.get('JWT_SECRET')

//     const token = this.jwt.signAsync(payload, {secret: secret, expiresIn: "30m"})
//     return {access_token:token}
//   }
// }
async signToken(
  userId: number,
  email: string,
): Promise<{ access_token: string }> {
  const payload = {
    sub: userId,
    email,
  };
  const secret = this.config.get('JWT_SECRET');

  const token = await this.jwt.signAsync(
    payload,
    {
      expiresIn: '15m',
      secret: secret,
    },
  );

  return {
    access_token: token,
  };
}

}
