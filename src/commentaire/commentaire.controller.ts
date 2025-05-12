import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, Put } from '@nestjs/common';
import { CommentaireService } from './commentaire.service';
import { CreateCommentaireDto } from './dto/create-commentaire.dto';
import { UpdateCommentaireDto } from './dto/update-commentaire.dto';

@Controller('commentaire')
export class CommentaireController {
  constructor(private readonly commentaireService: CommentaireService) { }

  @Post()
  async créerCommentaire(@Body() dto: CreateCommentaireDto) {
    const newCommentaire = await this.commentaireService.ajoutercommentaire(dto);
    return {
      message: "Le commentaire a été créé avec succès",
      newCommentaire,
    };
  }
  
  @Get()
  async listeCommentaire(@Res() reponse) {
    try {
      const listeCommentaire = await this.commentaireService.listecommentaire()
      return reponse.status(HttpStatus.OK).json({
        message: 'list de Commentaire',
        listeCommentaire
      })
    } catch (error) {
      return reponse.status(HttpStatus.BAD_REQUEST).json({
        message: 'Échec de récupération des données'
      })
    }
  }
  @Delete('/:id')
  async supprimerCommentaire(@Res() response, @Param('id') multimediaId: string) {
    try {
      const DataDelete = await this.commentaireService.supprimercommentaire(multimediaId)
      return response.status(HttpStatus.OK).json({
        message: "Commentaire delete",
        DataDelete
      })
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: "Commentaire not delete" + error
      })
    }
  }

  @Put(':id')
  async modifierCommentaire(@Res() response, @Param('id') CommentaireId: string, @Body() UpdateCommentaireDto: UpdateCommentaireDto) {
    try {
      const DataUpdate = await this.commentaireService.modifiercommentaire(CommentaireId, UpdateCommentaireDto);
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
  async getCommentaireById(@Res() response, @Param('id') CommentaireId: string) {
    try {
      const getCommentaire = await this.commentaireService.getbyid(CommentaireId)
      return response.status(HttpStatus.OK).json({
        message: `Commentaire avec l' ID '${CommentaireId}' est trouvable`,
        getCommentaire
      })
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: `Commentaire avec l' ID '${CommentaireId}' est introuvable` + error
      })
    }
  }
}
