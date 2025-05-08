import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, Put, UseInterceptors, UploadedFile, Request, UseGuards } from '@nestjs/common';
import { MembreService } from './membre.service';
import { CreateMembreDto } from './dto/create-membre.dto';
import { UpdateMembreDto } from './dto/update-membre.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import {diskStorage} from 'multer'
import { extname } from 'path';
import { AccessTokenGuard } from 'src/commen/guards/accessToken.guards';
import { RefreshTokenGuard } from 'src/commen/guards/refreshToken.guards';
@Controller('membre')
export class MembreController {
  constructor(private readonly membreService: MembreService) {}


  @UseInterceptors(FileInterceptor("image", {
    storage:diskStorage({
      destination: './storage',
      filename: (req, file, cb) => {
        cb(null , `${new Date().getTime()}${extname(file.originalname)}`)}
    })
  }))
  @Post()
  async createMembre(@Res() response, @Body() createMembreDto: CreateMembreDto,@UploadedFile() file) {
    try {
      createMembreDto.image = file ? file.filename : null ;
      const newMembre = await this.membreService.createmembre(createMembreDto)
      return response.status(HttpStatus.CREATED).json({
        message: 'Membre Created Successfully',
        data: newMembre
      })
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: `Membre not created: ${error.message}`,
        error: 'Bad Request'
      })
    }
  }
  @Post('fcm-token')
  @UseGuards(RefreshTokenGuard)
async saveFcmToken(@Request() req, @Body('fcmToken') token: string) {
  console.log('ID reçu dans le controller:', req.user.sub);

  const updatedMembre = await this.membreService.saveFcmToken(req.user.sub, token);
  return {
    message: 'Token FCM enregistré avec succès',
    membre: updatedMembre,
  };
}


  @Get()
  async findAllMembre(@Res() response) {
    try {
      const listeMembres = await this.membreService.findAllmembre()
      return response.status(HttpStatus.OK).json({
        message: 'Membres disponibles: ',
        data: listeMembres
      })
    } catch (error) {
      return response.status(HttpStatus.NOT_FOUND).json({
        message: `Membres non disponibles: ${error.message}`,
        error: 'Not Found'
      }) 
    }
  }

  @Get('/:id')
  async findOneMembre(@Res() response, @Param('id') id: string) {
    try {
      const MembreID = await this.membreService.findOnemembre(id)
      return response.status(HttpStatus.OK).json({
        message: `Membre with ID ${id} is found`,
        data: MembreID
      })
    } catch (error) {
      return response.status(HttpStatus.NOT_FOUND).json({
        message: `Membre with ID ${id} is not found: ${error.message}`,
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
  async updateMembre(@Res() response, @Param('id') id: string, @Body() updateMembreDto: UpdateMembreDto,@UploadedFile() file) {
    try {
      const newImage = file ? file.filename : null  ;
      if(!newImage){
        updateMembreDto.image = updateMembreDto.image ;
      }else {
        updateMembreDto.image = newImage ;
      }
      const updateMembreID = await this.membreService.updatemembre(id, updateMembreDto)
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

  @Delete('/:id')
  async deleteMembre(@Res() response, @Param('id') id: string) {
    try {
      const deleteMembreID = await this.membreService.deletemembre(id)
      return response.status(HttpStatus.OK).json({
        message: `Membre with ID ${id} is deleted Successfully`,
        data: deleteMembreID
      })
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: `Membre with ID ${id} is not deleted: ${error.message}`,
        error: 'Bad Request' 
      })
    }
  }

  @Post('suiviClub/:membreId')
  async suiviClub(
  @Res() response,
  @Param('membreId') membreId: string,
  @Body('clubId') clubId: string // Assure-toi que c'est bien "club" dans le body
) {
  try {
    const suivi = await this.membreService.suivreClub(membreId, clubId);
    return response.status(HttpStatus.OK).json({
      message: `Membre with ID ${membreId} has followed club ${clubId} successfully.`,
      data: suivi,
    });
  } catch (error) {
    return response.status(HttpStatus.BAD_REQUEST).json({
      message: `Erreur lors du suivi du club : ${error.message}`,
      error: 'Bad Request',
    });
  }
}

@Post('desuiviClub/:membreId')
async desuiviClub(
  @Res() response,
  @Param('membreId') membreId: string,
  @Body('club') clubId: string
) {
  try {
    const resultat = await this.membreService.desuivreClub(membreId, clubId);
    return response.status(HttpStatus.OK).json({
      message: `Membre avec ID ${membreId} a désuivi le club ${clubId}.`,
      data: resultat,
    });
  } catch (error) {
    return response.status(HttpStatus.BAD_REQUEST).json({
      message: `Erreur lors du désuivi du club : ${error.message}`,
      error: 'Bad Request',
    });
  }
}

@Post('suiviEvent/:membreId')
async suiviEvent(
@Res() response,
@Param('membreId') membreId: string,
@Body('eventId') eventId: string 
) {
try {
  const suivi = await this.membreService.suivreEvent(membreId, eventId);
  return response.status(HttpStatus.OK).json({
    message: `Membre with ID ${membreId} has followed event ${eventId} successfully.`,
    data: suivi,
  });
} catch (error) {
  return response.status(HttpStatus.BAD_REQUEST).json({
    message: `Erreur lors du suivi du club : ${error.message}`,
    error: 'Bad Request',
  });
}
}

@Put('/updatePaidStatus/:membreId/:eventId')
  async updatePaidStatus(@Res() response, @Param('membreId') membreId: string, @Param("eventId") eventId: string) {
    try {
      const updateMembre = await this.membreService.updatePaidMembre(membreId, eventId)
      return response.status(HttpStatus.OK).json({
        message: `Membre with ID ${membreId} is updated Successfully`,
        data: updateMembre
      })
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: `Membre with ID ${membreId} is not updated: ${error.message}`,
        error: 'Bad Request'  
      })
    }
  }

  @Put('/updatePaidStatusForClub/:membreId/:clubId')
  async updatePaidStatusForClub(@Res() response, @Param('membreId') membreId: string, @Param("clubId") clubId: string) {
    try {
      const updateMembre = await this.membreService.updatePaidMembreForClub(membreId, clubId)
      return response.status(HttpStatus.OK).json({
        message: `Membre with ID ${membreId} is updated Successfully`,
        data: updateMembre
      })
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: `Membre with ID ${membreId} is not updated: ${error.message}`,
        error: 'Bad Request'  
      })
    }
  }

}
