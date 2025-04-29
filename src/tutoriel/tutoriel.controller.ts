import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, Put, UseInterceptors, UploadedFile } from '@nestjs/common';
import { TutorielService } from './tutoriel.service';
import { CreateTutorielDto } from './dto/create-tutoriel.dto';
import { UpdateTutorielDto } from './dto/update-tutoriel.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import {diskStorage} from 'multer'
import { extname } from 'path';
@Controller('tutoriel')
export class TutorielController {
  constructor(private readonly tutorielService: TutorielService) {}
  @UseInterceptors(FileInterceptor('video', {
    storage: diskStorage({
      destination: './storage', 
      filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}${extname(file.originalname)}`;
        cb(null, uniqueName);
      }
    })
  }))
  @Post()
  async créertutoriel(@Res() response,@Body() CreatetutorielDto:CreateTutorielDto,@UploadedFile() file,){
    try{
      if (file) {
        CreatetutorielDto.video = file.filename; 
      }
      const newtutoriel=await this.tutorielService.ajoutertutoriel(CreatetutorielDto)
      return response.status(200).json({
        message:"L'hôtelier a été créé avec succès",
        newtutoriel
      })
    }
    catch(error)
    {return response.status(HttpStatus.BAD_REQUEST).json({
      message:"Essaie encore"+error
    })
    }
  }
  @Get()
    async listetutoriel(@Res()reponse){
    try {
     const listetutoriel=await this.tutorielService.listetutoriel()
     return reponse.status(HttpStatus.OK).json({
       message:'list de tutoriel',
       listetutoriel
     })
    } catch(error){
     return reponse.status(HttpStatus.BAD_REQUEST).json({
       message:'Échec de récupération des données'
   })
   }
   }
   @Delete('/:id')
   async supprimertutoriel(@Res() response,@Param('id')clientId:string){
     try{
       const DataDelete=await this.tutorielService.supprimertutoriel(clientId)
       return response.status(HttpStatus.OK).json({
       message:"tutoriel delete",
       DataDelete
       })
     } catch(error){
       return response.status(HttpStatus.BAD_REQUEST).json({
         message:"tutoriel not delete"+error
       })
     }
   }
 

   @UseInterceptors(FileInterceptor('video', {
    storage: diskStorage({
      destination: './storage',
      filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}${extname(file.originalname)}`;
        cb(null, uniqueName);
      }
    })
  }))
  @Put(':id')
  async modifiertutoriel(@Res() response, @Param('id') tutorielId: string, @Body() UpdatetutorielDto: UpdateTutorielDto,@UploadedFile() file) {
    try {
      if (file) {
        UpdatetutorielDto.video = file.filename; 
      }
      const DataUpdate = await this.tutorielService.modifiertutoriel(tutorielId, UpdatetutorielDto);
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
   async gettutorielById(@Res() response,@Param('id') tutorielId:string){
     try{
       const gettutoriel=await this.tutorielService.getbyid(tutorielId)
       return response.status(HttpStatus.OK).json({
         message:`tutoriel avec l' ID '${tutorielId}' est trouvable`,
         gettutoriel
         })
       }catch (error){
       return response.status(HttpStatus.BAD_REQUEST).json({
         message:`tutoriel avec l' ID '${tutorielId}' est introuvable`+error
         })
       }
     }
}
