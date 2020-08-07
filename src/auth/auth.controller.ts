import { Body, Controller, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  public constructor(
    private readonly authService: AuthService,
  ) { }

  @Post('/signup')
  public async signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('signin')
  public async signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string; }> {
    return this.authService.signIn(authCredentialsDto);
  }
}
