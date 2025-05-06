import { Module } from '@nestjs/common';
import { SuperAdminService } from './super_admin.service';
import { SuperAdminController } from './super_admin.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from 'src/user/entities/user.entity';

@Module({
  imports:[MongooseModule.forFeature([{name:"user",schema:userSchema}])],
  controllers: [SuperAdminController],
  providers: [SuperAdminService],
})
export class SuperAdminModule {}
