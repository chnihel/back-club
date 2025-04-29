import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, Put, UseInterceptors, UploadedFile } from '@nestjs/common';
import { DerigeantClubService } from './derigeant_club.service';
import { CreateDerigeantClubDto } from './dto/create-derigeant_club.dto';
import { UpdateDerigeantClubDto } from './dto/update-derigeant_club.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import {diskStorage} from 'multer'
import { extname } from 'path';

@Controller('derigeantclub')
export class DerigeantClubController {
  constructor(private readonly derigeantClubService: DerigeantClubService) {}

  @UseInterceptors(FileInterceptor("image", {
      storage:diskStorage({
        destination: './storage',
        filename: (req, file, cb) => {
          cb(null , `${new Date().getTime()}${extname(file.originalname)}`)}
      })
    }))
  @Post()
  async createderigeant(@Res() response, @Body() createderigeantDto: CreateDerigeantClubDto,@UploadedFile() file) {
    try {
      createderigeantDto.image = file ? file.filename : null ;
      const newderigeant = await this.derigeantClubService.createderigeant(createderigeantDto)
      return response.status(HttpStatus.CREATED).json({
        message: 'derigeant Created Successfully',
        data: newderigeant
      })
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: `derigeant not created: ${error.message}`,
        error: 'Bad Request'
      })
    }
  }

  @Get()
  async findAllderigeant(@Res() response) {
    try {
      const listederigeants = await this.derigeantClubService.findAllderigeant()
      return response.status(HttpStatus.OK).json({
        message: 'derigeants disponibles: ',
        data: listederigeants
      })
    } catch (error) {
      return response.status(HttpStatus.NOT_FOUND).json({
        message: `derigeants non disponibles: ${error.message}`,
        error: 'Not Found'
      }) 
    }
  }

  @Get('/:id')
  async findOnederigeant(@Res() response, @Param('id') id: string) {
    try {
      const derigeantID = await this.derigeantClubService.findOnederigeant(id)
      return response.status(HttpStatus.OK).json({
        message: `derigeant with ID ${id} is found`,
        data: derigeantID
      })
    } catch (error) {
      return response.status(HttpStatus.NOT_FOUND).json({
        message: `derigeant with ID ${id} is not found: ${error.message}`,
        error: 'Not Found',
      })
    }
  }

   @UseInterceptors(FileInterceptor("image", {
      storage:diskStorage({
        destination: './storage',
        filename: (req, file, cb) => {
          cb(null , `${new Date().getTime()}${extname(file.originalname)}`)}
      })
    }))
  @Put('/:id')
  async updatederigeant(@Res() response, @Param('id') id: string, @Body() updatederigeantDto: UpdateDerigeantClubDto,@UploadedFile() file) {
    try {
      const newImage = file ? file.filename : null  ;
      if(!newImage){
        updatederigeantDto.image = updatederigeantDto.image ;
      }else {
        updatederigeantDto.image = newImage ;
      }
      const updatederigeantID = await this.derigeantClubService.updatederigeant(id, updatederigeantDto)
      return response.status(HttpStatus.OK).json({
        message: `derigeant with ID ${id} is updated Successfully`,
        data: updatederigeantID
      })
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: `derigeant with ID ${id} is not updated: ${error.message}`,
        error: 'Bad Request'  
      })
    }
  }

  @Delete('/:id')
  async deletederigeant(@Res() response, @Param('id') id: string) {
    try {
      const deletederigeantID = await this.derigeantClubService.deletederigeant(id)
      return response.status(HttpStatus.OK).json({
        message: `derigeant with ID ${id} is deleted Successfully`,
        data: deletederigeantID
      })
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: `derigeant with ID ${id} is not deleted: ${error.message}`,
        error: 'Bad Request' 
      })
    }
  }
}
