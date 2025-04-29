import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import * as argon2 from "argon2"
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService, 
    private jwtService: JwtService, 
    private configService: ConfigService, 
    private mailerService: MailerService
  ) {}

  /** -------- SIGN IN -------- **/
  async signIN(data: CreateAuthDto) {
    const user = await this.userService.findUserByEmail(data.email)
    if (!user){
      throw new BadRequestException(`User with email ${data.email} is not exist`)
    }

    const passwordVerify = await argon2.verify(user.password, data.password)
    if (!passwordVerify) {
      throw new BadRequestException(`User with password ${data.password} is not valid`)
    }

    const tokens = await this.getTokens(user._id, user.nom)
    await this.updateRefreshToken(user._id, tokens.refreshToken)
    return {user, tokens}
  }

  /** -------- GENERATE TOKENS -------- **/
  async getTokens(userID: any, username: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userID, username
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: '15m'
        }
      ),

      this.jwtService.signAsync(
        {
          sub: userID, username
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: '7d',
        },
      ),
    ]);
    return { accessToken, refreshToken }
  }

  /** -------- UPDATE REFRESH TOKEN -------- **/
  async updateRefreshToken(userID: any, refreshToken: string){
    const hashedRefreshToken = await argon2.hash(refreshToken)
    await this.userService.updateUser(userID, {refreshToken: hashedRefreshToken})
  }


  /** -------- FORGOT PASSWORD -------- **/
  async forgetPassword(email: string) {
    try {
      const user = await this.userService.findUserByEmail(email)
      if(!user) {
        throw new BadRequestException(`User with email ${email} not exist`)
      } else {
        const token = await this.jwtService.signAsync({id: user._id},{secret: this.configService.get<string>('JWT_ACCESS_SECRET'), expiresIn: '5m'})
        await this.userService.updateToken(user._id, token)
        const option = {
          to: user.email,
          subject: 'forget-password',
          context: {token: token},
          html:`<h1>Update your password<a href=http://localhost:3000/${token}>Click Here</a></h1>`
        }

        await this.mailerService.sendMail(option)
        return {success: true, message:'You can change ur password', data: user}
      }
    } catch (error) {
      return error

    }
  }

  async resetPassword(newPassword: string, token: string) {
    try {
      const verifyToken = await this.jwtService.verify(token, {secret: this.configService.get<string>('JWT_Access_Secret')})
      if (!verifyToken) {
        throw new BadRequestException(`Invalid Token`)
      }
      const user = await this.userService.findOneUser(verifyToken.id)
      if (!user) {
        throw new BadRequestException(`User with token ${token} not exist`)
      }
      const hashedPassword = await argon2.hash(newPassword)

      console.log('hashed password', hashedPassword)  ////// verification avec console

      user.password = hashedPassword

      console.log('new password', user.password)      ////// verification avec console

      // user.refreshToken = undefined
      // await user.save() 
      await this.userService.updateUser(user.id, {password: hashedPassword, refreshToken: undefined})

      const updateUser = await this.userService.findOneUser(user.id)  //pour verifier probleme
      console.log('message: updated password', updateUser.password)   //pour verifier probleme

      return {success: true, message:"Password Updated Successfully", data: user}
    } catch (error) {
      return error //failed to reset password msg
    }
  }
  //methode changer mot de passe 

}
