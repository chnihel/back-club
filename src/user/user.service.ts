import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from './interface/user.interface';
import { MailerService } from '@nestjs-modules/mailer';
import * as argon2 from "argon2"
import { join } from 'path';
import * as crypto from 'crypto';


@Injectable()
export class UserService {
  constructor(@InjectModel('user') private userModel: Model<IUser>,
    private readonly mailerService: MailerService,
  ){}

  async findUserByEmail(email: string): Promise<IUser> {
    const getUserByEmail = await this.userModel.findOne({email})
    if (!getUserByEmail) {
      throw new NotFoundException(`User with Email ${email} Not Found`);
    }
    return getUserByEmail
  }
  async updateToken(id: any, token: string) {
    const user = await this.userModel.findByIdAndUpdate(id, {refreshToken: token},{ new: true })
    if (!user) {
      throw new NotFoundException(`User with ID ${id} Not Found`)
    }
    return user
  }
  async updatePassword(id: string, oldPassword: string, newPassword: string): Promise<string> {
    const userID = await this.userModel.findById(id);
    if (!userID) {
      throw new NotFoundException('Utilisateur non trouvé');
    }

    const isMatch = await argon2.verify(userID.password, oldPassword);
    if (!isMatch) {
      throw new BadRequestException('Ancien mot de passe incorrect');
    }

    const hashedNewPassword = await argon2.hash(newPassword)

    console.log('hashed mon password', userID.password)

    await this.userModel.findByIdAndUpdate(id, {password: hashedNewPassword}, {new: true})

    return 'Mot de passe mis à jour avec succès';  
  }


  async verifyCode(code: string, res: any): Promise<any> {
    const userID = await this.userModel.findOne({code}); 

    if (!userID) {
      return res.sendFile(join(process.cwd(), 'public', 'verification_compte', 'error.html'));;
    }

    if (userID.code !== code) {
      return res.sendFile(join(process.cwd(), 'public', 'verification_compte', 'error.html'));
    }

    userID.code = null 
    userID.verifyEmail = true
    await userID.save()
    return res.sendFile(join(process.cwd(), 'public', 'verification_compte', 'correct.html'));
  }
  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<IUser> {
    const updateUserID = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
    if (!updateUserID) {
      throw new NotFoundException(`User with ID ${id} Not Found`);
    }
    return updateUserID;
  }


  async findOneUser(id: string): Promise<IUser> {
    const userID = await this.userModel.findById(id).exec();
    if (!userID) {
      throw new NotFoundException(`User with ID ${id} Not Found`);
    }
    return userID;
  }

  async sendVerificationEmail(id: string, email: string): Promise<any> {
    try {
      // 1️⃣ Générer un code aléatoire de vérification (6 chiffres)
      const verificationCode = crypto.randomInt(100000, 999999).toString();

      // Trouver l'utilisateur dans la base de données
      const userID = await this.userModel.findById(id);
      if (!userID) {
        throw new NotFoundException(`Passager avec l'ID ${id} introuvable`);
      }

      // 2️⃣ Enregistrer le code de vérification dans la base de données
      userID.code = verificationCode
      await userID.save()
      
      // 3️⃣ Préparer le contenu de l'email -- Options pour l'email
      const options = {
        to: email,
        subject: 'Code de Vérification',
        context: { verificationCode: verificationCode },
        html: `
          <!DOCTYPE html>
          <html lang="fr">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Vérification de votre compte</title>
            <style>
              body { font-family: Arial, sans-serif; background-color: #f4f4f9; color: #333; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
              .container { background-color: #fff; padding: 40px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); width: 100%; max-width: 500px; text-align: center; }
              h1 { color: #4CAF50; }
              p { font-size: 1.1rem; margin-bottom: 20px; }
              .verification-code { font-size: 2rem; font-weight: bold; color: #2196F3; }
              .btn { background-color: #4CAF50; color: white; padding: 10px 20px; font-size: 1.1rem; border: none; border-radius: 5px; cursor: pointer; text-decoration: none; display: inline-block; margin-top: 20px; transition: background-color 0.3s; }
              .btn:hover { background-color: #45a049; }
              .footer { font-size: 0.9rem; color: #777; margin-top: 30px; }
              .footer a { color: #2196F3; text-decoration: none; }
              .footer a:hover { text-decoration: underline; }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>Vérification de votre compte</h1>
              <p>Votre code de vérification est : <span class="verification-code">${verificationCode}</span></p>
              <p>Veuillez cliquer sur le lien ci-dessous pour valider votre compte :</p>
              <a href="http://localhost:5000/user/verifyCode/${verificationCode}" class="btn">Vérifier mon compte</a>
              <div class="footer">
                <p>Si vous n'avez pas demandé cette vérification, vous pouvez ignorer cet email.</p>
                <p>Merci de votre confiance !</p> 
              </div>
            </div>
          </body>
          </html>
        `,
      };

      // 4️⃣ Envoyer l'email via Mailtrap ou autre service
      await this.mailerService.sendMail(options);
      // Retourner le code de vérification
      return { success: true, verificationCode: verificationCode }; // Retourne le code de vérification
    } catch (error) {
      throw new Error(`Erreur lors de l'envoi de l'email : ${error.message}`);
    }
  }


  async findUtilisateurid(id:string): Promise<IUser>{
    const UtilisateurId=await this.userModel.findById(id)
    if(!UtilisateurId){
      throw new NotFoundException(`ce utilisateur avec l'id ${id}, existe pas `)
    }
    return UtilisateurId
}
}
