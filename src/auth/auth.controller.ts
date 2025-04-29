import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('SignIn')
  signIn(@Body() data: CreateAuthDto) {
    return this.authService.signIN(data)
  }

  @Post('forget-password')
  async forgetPassword(@Body() data:CreateAuthDto) {
    return this.authService.forgetPassword(data.email)
  }

  @Post('reset-password/:token')
  async resetPassword(@Body() data:CreateAuthDto, @Param('token') token: string){
    return this.authService.resetPassword(data.password, token)
  }
}
