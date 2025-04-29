import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, Put } from '@nestjs/common';
import { GuideService } from './guide.service';
import { CreateGuideDto } from './dto/create-guide.dto';
import { UpdateGuideDto } from './dto/update-guide.dto';

@Controller('guide')
export class GuideController {
  constructor(private readonly guideService: GuideService) {}

  @Post()
   async créerGuide(@Res() response,@Body() CreateGuideDto:CreateGuideDto){
     try{
       const newGuide=await this.guideService.ajouterguide(CreateGuideDto)
       return response.status(200).json({
         message:"L'hôtelier a été créé avec succès",
         newGuide
       })
     }
     catch(error)
     {return response.status(HttpStatus.BAD_REQUEST).json({
       message:"Essaie encore"+error
     })
     }
   }
   @Get()
     async listeGuide(@Res()reponse){
     try {
      const listeGuide=await this.guideService.listeguide()
      return reponse.status(HttpStatus.OK).json({
        message:'list de Guide',
        listeGuide
      })
     } catch(error){
      return reponse.status(HttpStatus.BAD_REQUEST).json({
        message:'Échec de récupération des données'
    })
    }
    }
    @Delete('/:id')
    async supprimerGuide(@Res() response,@Param('id')clientId:string){
      try{
        const DataDelete=await this.guideService.supprimerguide(clientId)
        return response.status(HttpStatus.OK).json({
        message:"Guide delete",
        DataDelete
        })
      } catch(error){
        return response.status(HttpStatus.BAD_REQUEST).json({
          message:"Guide not delete"+error
        })
      }
    }
  
   @Put(':id')
   async modifierGuide(@Res() response, @Param('id') GuideId: string, @Body() UpdateGuideDto: UpdateGuideDto) {
     try {
       const DataUpdate = await this.guideService.modifierguide(GuideId, UpdateGuideDto);
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
    async getGuideById(@Res() response,@Param('id') GuideId:string){
      try{
        const getGuide=await this.guideService.getbyid(GuideId)
        return response.status(HttpStatus.OK).json({
          message:`Guide avec l' ID '${GuideId}' est trouvable`,
          getGuide
          })
        }catch (error){
        return response.status(HttpStatus.BAD_REQUEST).json({
          message:`Guide avec l' ID '${GuideId}' est introuvable`+error
          })
        }
      }
}
