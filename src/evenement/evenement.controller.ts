import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, Put } from '@nestjs/common';
import { EvenementService } from './evenement.service';
import { CreateEvenementDto } from './dto/create-evenement.dto';
import { UpdateEvenementDto } from './dto/update-evenement.dto';

@Controller('evenement')
export class EvenementController {
  constructor(private readonly evenementService: EvenementService) {}

  @Post()
   async créerevenement(@Res() response,@Body() CreateevenementDto:CreateEvenementDto){
     try{
       const newevenement=await this.evenementService.ajouterevenement(CreateevenementDto)
       return response.status(200).json({
         message:"L'hôtelier a été créé avec succès",
         newevenement
       })
     }
     catch(error)
     {return response.status(HttpStatus.BAD_REQUEST).json({
       message:"Essaie encore"+error
     })
     }
   }
   @Get()
     async listeevenement(@Res()reponse){
     try {
      const listeevenement=await this.evenementService.listeevenement()
      return reponse.status(HttpStatus.OK).json({
        message:'list de evenement',
        listeevenement
      })
     } catch(error){
      return reponse.status(HttpStatus.BAD_REQUEST).json({
        message:'Échec de récupération des données'
    })
    }
    }
    @Delete('/:id')
    async supprimerevenement(@Res() response,@Param('id')clientId:string){
      try{
        const DataDelete=await this.evenementService.supprimerevenement(clientId)
        return response.status(HttpStatus.OK).json({
        message:"evenement delete",
        DataDelete
        })
      } catch(error){
        return response.status(HttpStatus.BAD_REQUEST).json({
          message:"evenement not delete"+error
        })
      }
    }
  
   @Put(':id')
   async modifierevenement(@Res() response, @Param('id') evenementId: string, @Body() UpdateevenementDto: UpdateEvenementDto) {
     try {
       const DataUpdate = await this.evenementService.modifierevenement(evenementId, UpdateevenementDto);
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
    async getevenementById(@Res() response,@Param('id') evenementId:string){
      try{
        const getevenement=await this.evenementService.getbyid(evenementId)
        return response.status(HttpStatus.OK).json({
          message:`evenement avec l' ID '${evenementId}' est trouvable`,
          getevenement
          })
        }catch (error){
        return response.status(HttpStatus.BAD_REQUEST).json({
          message:`evenement avec l' ID '${evenementId}' est introuvable`+error
          })
        }
      }
}
