import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';

import { AccessToken } from '../token/access-token.interface';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { LoginCredentialsDTO } from './dto/login-credentials.dto';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  public constructor(
    private readonly authService: AuthService,
  ) { }

  @Post('/signup')
  public async signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<AccessToken> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('signin')
  public async signIn(@Body(ValidationPipe) loginCredentialsDTO: LoginCredentialsDTO): Promise<AccessToken> {
    return this.authService.signIn(loginCredentialsDTO);
  }
}
