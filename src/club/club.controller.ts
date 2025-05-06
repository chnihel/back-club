import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, Put, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ClubService } from './club.service';
import { CreateClubDto, MembreBureauDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer'
import { extname } from 'path';
@Controller('club')
export class ClubController {
  constructor(private readonly clubService: ClubService) { }


  @UseInterceptors(FileInterceptor("logo", {
    storage: diskStorage({
      destination: './storage',
      filename: (req, file, cb) => {
        cb(null, `${new Date().getTime()}${extname(file.originalname)}`)
      }
    })
  }))
  @Post()
  async créerClub(@Res() response, @Body() CreateclubDto: CreateClubDto, @UploadedFile() file) {
    try {
      CreateclubDto.logo = file ? file.filename : null;

      const newclub = await this.clubService.ajouterclub(CreateclubDto)
      return response.status(200).json({
        message: "L'hôtelier a été créé avec succès",
        newclub
      })
    }
    catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: "Essaie encore" + error
      })
    }
  }

  @UseInterceptors(FileInterceptor("image", {
    storage: diskStorage({
      destination: './storage',
      filename: (req, file, cb) => {
        cb(null, `${new Date().getTime()}${extname(file.originalname)}`)
      }
    })
  }))
  @Post("membreBureau/:clubId")
  async createMembreBureau(@Res() response, @Body() membreBureauDto: MembreBureauDto, @Param("clubId") clubId: string, @UploadedFile() file) {
    try {
      membreBureauDto.image = file ? file.filename : null;

      const newMembreBureau = await this.clubService.ajouterMembreBureau(clubId, membreBureauDto)
      return response.status(200).json({
        message: "membre bureau a été créé avec succès",
        newMembreBureau
      })
    }
    catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: "Essaie encore" + error
      })
    }
  }

  @UseInterceptors(FileInterceptor("image", {
    storage: diskStorage({
      destination: './storage',
      filename: (req, file, cb) => {
        cb(null, `${new Date().getTime()}${extname(file.originalname)}`)
      }
    })
  }))
  @Put("membreBureau/:clubId/:membreId")
  async updateMembreBureau(@Res() response, @Param("clubId") clubId: string, @Param('membreId') membreId: string, @Body() membreBureauDto: MembreBureauDto, @UploadedFile() file) {
    try {
      const newImage = file ? file.filename : null;
      if (!newImage) {
        membreBureauDto.image = membreBureauDto.image;
      } else {
        membreBureauDto.image = newImage;
      }
      const newMembreBureau = await this.clubService.updateMembreBureauById(clubId, membreId, membreBureauDto)
      return response.status(200).json({
        message: "membre bureau a été update avec succès",
        newMembreBureau
      })
    }
    catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: "Essaie encore" + error
      })
    }
  }
  @Get()
  async listeclub(@Res() reponse) {
    try {
      const listeclub = await this.clubService.listeclub()
      return reponse.status(HttpStatus.OK).json({
        message: 'list de club',
        listeclub
      })
    } catch (error) {
      return reponse.status(HttpStatus.BAD_REQUEST).json({
        message: 'Échec de récupération des données'
      })
    }
  }
  @Delete('/:id')
  async supprimerClub(@Res() response, @Param('id') clientId: string) {
    try {
      const DataDelete = await this.clubService.supprimerclub(clientId)
      return response.status(HttpStatus.OK).json({
        message: "club delete",
        DataDelete
      })
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: "club not delete" + error
      })
    }
  }

  @UseInterceptors(FileInterceptor("logo", {
    storage: diskStorage({
      destination: './storage',
      filename: (req, file, cb) => {
        cb(null, `${new Date().getTime()}${extname(file.originalname)}`)
      }
    })
  }))
  @Put(':id')
  async modifierClub(@Res() response, @Param('id') clubId: string, @Body() UpdateclubDto: UpdateClubDto, @UploadedFile() file) {
    try {
      const newImage = file ? file.filename : null;
      if (!newImage) {
        UpdateclubDto.logo = UpdateclubDto.logo;
      } else {
        UpdateclubDto.logo = newImage;
      }
      const DataUpdate = await this.clubService.modifierclub(clubId, UpdateclubDto);
      return response.status(HttpStatus.OK).json({
        message: "Les informations ont été mises à jour",
        DataUpdate
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: "Erreur lors de la mise à jour des informations : " + error.message
      });
    }
  }


  @Get('/:id')
  async getClubById(@Res() response, @Param('id') clubId: string) {
    try {
      const getclub = await this.clubService.getbyid(clubId)
      return response.status(HttpStatus.OK).json({
        message: `club avec l' ID '${clubId}' est trouvable`,
        getclub
      })
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: `club avec l' ID '${clubId}' est introuvable` + error
      })
    }
  }

  @Put('status/:id')
  async updateStatus(@Res() response,@Param('id') clubId:string){
    try {
      const getclub = await this.clubService.updateStatusClub(clubId)
      return response.status(HttpStatus.OK).json({
        message: `club avec l' ID '${clubId}' est trouvable`,
        getclub
      })
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: `club avec l' ID '${clubId}' est introuvable` + error
      })
    }
  }
}
