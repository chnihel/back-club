import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, Put } from '@nestjs/common';
import { ReglementService } from './reglement.service';
import { CreateReglementDto } from './dto/create-reglement.dto';
import { UpdateReglementDto } from './dto/update-reglement.dto';

@Controller('reglement')
export class ReglementController {
  constructor(private readonly reglementService: ReglementService) {}

  @Post()
  async créerReglement(@Res() response,@Body() CreateReglementDto:CreateReglementDto){
    try{
      const newReglement=await this.reglementService.ajouterreglement(CreateReglementDto)
      return response.status(200).json({
        message:"L'hôtelier a été créé avec succès",
        newReglement
      })
    }
    catch(error)
    {return response.status(HttpStatus.BAD_REQUEST).json({
      message:"Essaie encore"+error
    })
    }
  }
  @Get()
    async listeReglement(@Res()reponse){
    try {
     const listeReglement=await this.reglementService.listereglement()
     return reponse.status(HttpStatus.OK).json({
       message:'list de Reglement',
       listeReglement
     })
    } catch(error){
     return reponse.status(HttpStatus.BAD_REQUEST).json({
       message:'Échec de récupération des données'
   })
   }
   }
   @Delete('/:id')
   async supprimerReglement(@Res() response,@Param('id')clientId:string){
     try{
       const DataDelete=await this.reglementService.supprimerreglement(clientId)
       return response.status(HttpStatus.OK).json({
       message:"Reglement delete",
       DataDelete
       })
     } catch(error){
       return response.status(HttpStatus.BAD_REQUEST).json({
         message:"Reglement not delete"+error
       })
     }
   }
 
  @Put(':id')
  async modifierReglement(@Res() response, @Param('id') ReglementId: string, @Body() UpdateReglementDto: UpdateReglementDto) {
    try {
      const DataUpdate = await this.reglementService.modifierreglement(ReglementId, UpdateReglementDto);
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
   async getReglementById(@Res() response,@Param('id') ReglementId:string){
     try{
       const getReglement=await this.reglementService.getbyid(ReglementId)
       return response.status(HttpStatus.OK).json({
         message:`Reglement avec l' ID '${ReglementId}' est trouvable`,
         getReglement
         })
       }catch (error){
       return response.status(HttpStatus.BAD_REQUEST).json({
         message:`Reglement avec l' ID '${ReglementId}' est introuvable`+error
         })
       }
     }
}
