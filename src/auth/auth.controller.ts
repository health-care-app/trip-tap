import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AccessToken } from '../token/access-token.interface';
import { AuthService } from './auth.service';
import { SignUpCredentialsDto } from './dto/signup-credentials.dto';
import { SignInCredentialsDto } from './dto/signin-credentials.dto';

@Controller('auth')
export class AuthController {
  public constructor(
    private readonly authService: AuthService,
  ) { }

  @Post('/signup')
  public async signUp(@Body(ValidationPipe) signUpCredentialsDto: SignUpCredentialsDto): Promise<AccessToken> {
    return this.authService.signUp(signUpCredentialsDto);
  }

  @Post('signin')
  public async signIn(@Body(ValidationPipe) signInCredentialsDto: SignInCredentialsDto): Promise<AccessToken> {
    return this.authService.signIn(signInCredentialsDto);
  }
}
