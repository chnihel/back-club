import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from './entities/user.entity';
import { derigeantSchema } from 'src/derigeant_club/entities/derigeant_club.entity';
import { membreSchema } from 'src/membre/entities/membre.entity';

@Module({
  imports: [ MongooseModule.forFeature(
    [{ name:'user', schema: userSchema, 
      discriminators: [
        { name: 'derigeant_club', schema:derigeantSchema},
        { name: 'membre', schema:membreSchema},
      ]}]
  )],
  controllers: [UserController],
  providers: [UserService],
  exports:[UserService]
})
export class UserModule {}
