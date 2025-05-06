import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, Put } from '@nestjs/common';
import { RessourcesService } from './ressources.service';
import { CreateRessourceDto } from './dto/create-ressource.dto';
import { UpdateRessourceDto } from './dto/update-ressource.dto';

@Controller('ressources')
export class RessourcesController {
  constructor(private readonly ressourcesService: RessourcesService) {}

  /*  @Post()
    async créerRessource(@Res() response,@Body() CreateRessourceDto:CreateRessourceDto){
      try{
        const newRessource=await this.ressourcesService.ajouterressource(CreateRessourceDto)
        return response.status(200).json({
          message:"L'hôtelier a été créé avec succès",
          newRessource
        })
      }
      catch(error)
      {return response.status(HttpStatus.BAD_REQUEST).json({
        message:"Essaie encore"+error
      })
      }
    } */
    @Get()
      async listeRessource(@Res()reponse){
      try {
       const listeRessource=await this.ressourcesService.listeressource()
       return reponse.status(HttpStatus.OK).json({
         message:'list de Ressource',
         listeRessource
       })
      } catch(error){
       return reponse.status(HttpStatus.BAD_REQUEST).json({
         message:'Échec de récupération des données'
     })
     }
     }
   /*   @Delete('/:id')
     async supprimerRessource(@Res() response,@Param('id')clientId:string){
       try{
         const DataDelete=await this.ressourcesService.supprimerressource(clientId)
         return response.status(HttpStatus.OK).json({
         message:"Ressource delete",
         DataDelete
         })
       } catch(error){
         return response.status(HttpStatus.BAD_REQUEST).json({
           message:"Ressource not delete"+error
         })
       }
     } */
   
    @Put(':id')
    async modifierRessource(@Res() response, @Param('id') RessourceId: string, @Body() UpdateRessourceDto: UpdateRessourceDto) {
      try {
        const DataUpdate = await this.ressourcesService.modifierressource(RessourceId, UpdateRessourceDto);
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
     async getRessourceById(@Res() response,@Param('id') RessourceId:string){
       try{
         const getRessource=await this.ressourcesService.getbyid(RessourceId)
         return response.status(HttpStatus.OK).json({
           message:`Ressource avec l' ID '${RessourceId}' est trouvable`,
           getRessource
           })
         }catch (error){
         return response.status(HttpStatus.BAD_REQUEST).json({
           message:`Ressource avec l' ID '${RessourceId}' est introuvable`+error
           })
         }
       }
}
