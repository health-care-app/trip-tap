import { Body, Controller, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(

    private authService: AuthService,
  ) { }

  @Post('/signup')
  signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<void> { //create username and password, call signUp method, and pass values.
    return this.authService.signUp(authCredentialsDto);// returning the call to the service.
  }

  @Post('signin')
  signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }


}
