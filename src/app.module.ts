import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { MembreModule } from './membre/membre.module';
import { DerigeantClubModule } from './derigeant_club/derigeant_club.module';
import { CommentaireModule } from './commentaire/commentaire.module';
import { RessourcesModule } from './ressources/ressources.module';
import { GuideModule } from './guide/guide.module';
import { ReglementModule } from './reglement/reglement.module';
import { TutorielModule } from './tutoriel/tutoriel.module';
import { MutimediaModule } from './mutimedia/mutimedia.module';
import { MessageModule } from './message/message.module';
import { NotificationModule } from './notification/notification.module';
import { ClubModule } from './club/club.module';
import { EvenementModule } from './evenement/evenement.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({

  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017', { dbName: 'myclub' }),
    UserModule,
    MembreModule,
    DerigeantClubModule,
    CommentaireModule,
    RessourcesModule,
    GuideModule,
    ReglementModule,
    TutorielModule,
    MutimediaModule,
    MessageModule,
    NotificationModule,
    ClubModule,
    EvenementModule,
    AuthModule,
    ConfigModule.forRoot({isGlobal: true}),
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
