import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Res, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('verifyCode/:code')
  async verifyCode(@Param('code') code: string, @Res() response) {
    return this.userService.verifyCode(code, response); 
  }

  @Put('update-password/:id')
  async updatePassword(@Res() response, @Param('id') userID: string, @Body() body: { oldPassword: string; newPassword: string }) {
    try {
      const updatePasswordID = await this.userService.updatePassword(userID, body.oldPassword, body.newPassword)
      return response.status(HttpStatus.OK).json({
        message: ` Password mis à jour avec succès `,
        data: updatePasswordID
      })
    } catch (error) {
      return response.status(HttpStatus.NOT_FOUND).json({
        message: `User with ID ${userID} is not found: ${error.message}`,
        error: 'Not Found',
      })
    }
  }
 
}
