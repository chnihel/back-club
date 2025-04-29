import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, Put, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { MutimediaService } from './mutimedia.service';
import { CreateMutimediaDto } from './dto/create-mutimedia.dto';
import { UpdateMutimediaDto } from './dto/update-mutimedia.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer'
import { extname } from 'path';

@Controller('mutimedia')
export class MutimediaController {
  constructor(private readonly multimediaService: MutimediaService) { }

  @UseInterceptors(FilesInterceptor('format', 10, {
    storage: diskStorage({
      destination: './storage',
      filename: (req, file, cb) => {
        cb(null, `${new Date().getTime()}${extname(file.originalname)}`)
      }
    })
  }
  ))
  @Post()
  async créermutimedia(@Res() response, @Body() CreatemutimediaDto: CreateMutimediaDto, @UploadedFiles() files) {
    try {
      CreatemutimediaDto.format = files ? files.map(file => file.filename) : []

      const newmutimedia = await this.multimediaService.ajoutermultimedia(CreatemutimediaDto)
      return response.status(200).json({
        message: "L'hôtelier a été créé avec succès",
        newmutimedia
      })
    }
    catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: "Essaie encore" + error
      })
    }
  }
  @Get()
  async listemutimedia(@Res() reponse) {
    try {
      const listemutimedia = await this.multimediaService.listemultimedia()
      return reponse.status(HttpStatus.OK).json({
        message: 'list de mutimedia',
        listemutimedia
      })
    } catch (error) {
      return reponse.status(HttpStatus.BAD_REQUEST).json({
        message: 'Échec de récupération des données'
      })
    }
  }
  @Delete('/:id')
  async supprimermutimedia(@Res() response, @Param('id') clientId: string) {
    try {
      const DataDelete = await this.multimediaService.supprimermultimedia(clientId)
      return response.status(HttpStatus.OK).json({
        message: "mutimedia delete",
        DataDelete
      })
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: "mutimedia not delete" + error
      })
    }
  }
  @UseInterceptors(FilesInterceptor('format', 10, {
    storage: diskStorage({
      destination: './storage',
      filename: (req, file, cb) => {
        cb(null, `${new Date().getTime()}${extname(file.originalname)}`)
      }
    })
  }))
  @Put(':id')
  async modifiermutimedia(
    @Res() response,
    @Param('id') mutimediaId: string,
    @Body() updateMutimediaDto: UpdateMutimediaDto,
    @UploadedFiles() files
  ) {
    try {
      if (files && files.length > 0) {
        updateMutimediaDto.format = files.map(file => file.filename);
      }

      const dataUpdate = await this.multimediaService.modifiermultimedia(mutimediaId, updateMutimediaDto);

      return response.status(HttpStatus.OK).json({
        message: "Les informations ont été mises à jour",
        dataUpdate
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: "Erreur lors de la mise à jour des informations : " + error.message
      });
    }
  }


  @Get('/:id')
  async getmutimediaById(@Res() response, @Param('id') mutimediaId: string) {
    try {
      const getmutimedia = await this.multimediaService.getbyid(mutimediaId)
      return response.status(HttpStatus.OK).json({
        message: `mutimedia avec l' ID '${mutimediaId}' est trouvable`,
        getmutimedia
      })
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: `mutimedia avec l' ID '${mutimediaId}' est introuvable` + error
      })
    }
  }
}
