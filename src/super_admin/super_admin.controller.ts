import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, UseInterceptors, UploadedFile, Put } from '@nestjs/common';
import { SuperAdminService } from './super_admin.service';
import { CreateSuperAdminDto } from './dto/create-super_admin.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import {diskStorage} from 'multer'
import { extname } from 'path';
import { UpdateSuperAdminDto } from './dto/update-super_admin.dto';

@Controller('super-admin')
export class SuperAdminController {
  constructor(private readonly superAdminService: SuperAdminService) {}

  @UseInterceptors(FileInterceptor("image", {
     storage:diskStorage({
       destination: './storage',
       filename: (req, file, cb) => {
         cb(null , `${new Date().getTime()}${extname(file.originalname)}`)}
     })
   }))
  @Post()
  async createadmin(@Body() CreateAdminDto: CreateSuperAdminDto,@UploadedFile() file) {
    CreateAdminDto.image = file ? file.filename : null ;

    return await this.superAdminService.createadmin(CreateAdminDto);
  }

  @UseInterceptors(FileInterceptor("image", {
      storage:diskStorage({
        destination: './storage',
        filename: (req, file, cb) => {
          cb(null , `${new Date().getTime()}${extname(file.originalname)}`)}
      })
    }))
    @Put('/:id')
    async updateMembre(@Res() response, @Param('id') id: string, @Body() updateMembreDto: UpdateSuperAdminDto,@UploadedFile() file) {
      try {
        const newImage = file ? file.filename : null  ;
        if(!newImage){
          updateMembreDto.image = updateMembreDto.image ;
        }else {
          updateMembreDto.image = newImage ;
        }
        const updateMembreID = await this.superAdminService.updatesuperAdmin(id, updateMembreDto)
        return response.status(HttpStatus.OK).json({
          message: `Membre with ID ${id} is updated Successfully`,
          data: updateMembreID
        })
      } catch (error) {
        return response.status(HttpStatus.BAD_REQUEST).json({
          message: `Membre with ID ${id} is not updated: ${error.message}`,
          error: 'Bad Request'  
        })
      }
    }
}
