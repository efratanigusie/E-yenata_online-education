import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, SignInDto, SignUpDto} from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: SignUpDto) {
    return this.authService.signUp(dto);
  }


  @Post('signin')
  signin(@Body() dto: SignInDto):Promise<boolean> {
    return this.authService.signIn(dto);
  }
}


