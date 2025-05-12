import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, Put } from '@nestjs/common';
import { RapportService } from './rapport.service';
import { CreateRapportDto } from './dto/create-rapport.dto';
import { UpdateRapportDto } from './dto/update-rapport.dto';

@Controller('rapport')
export class RapportController {
  constructor(private readonly rapportService: RapportService) {}
 @Post()
   async créerrapport(@Res() response,@Body() createRapportEventDto:CreateRapportDto){
     try{
       const newrapport=await this.rapportService.ajouterRapport(createRapportEventDto)
       return response.status(200).json({
         message:"rapport a été créé avec succès",
         newrapport
       })
     }
     catch(error)
     {return response.status(HttpStatus.BAD_REQUEST).json({
       message:"Essaie encore"+error
     })
     }
   }


    @Delete('/:id')
       async supprimerrapport(@Res() response,@Param('id') rapportId:string){
         try{
           const DataDelete=await this.rapportService.supprimerrapport(rapportId)
           return response.status(HttpStatus.OK).json({
           message:"rapport delete",
           DataDelete
           })
         } catch(error){
           return response.status(HttpStatus.BAD_REQUEST).json({
             message:"rapport not delete"+error
           })
         }
       }
     
      @Put(':id')
      async modifierrapport(@Res() response, @Param('id') rapportId: string, @Body() UpdaterapportDto: UpdateRapportDto) {
        try {
          const DataUpdate = await this.rapportService.modifierrapport(rapportId, UpdaterapportDto);
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
}
