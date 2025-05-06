import { IsNotEmpty } from "class-validator";

export class CreatePaiementDto {
    @IsNotEmpty()
    montant:number

}
