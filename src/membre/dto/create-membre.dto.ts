import { Types } from "mongoose";
import { CreateUserDto } from "src/user/dto/create-user.dto";
export class CreatePaiementClub {
    clubId: Types.ObjectId;
    isPaid: boolean;

}
export class CreatePaiementEvent {
    eventId: Types.ObjectId;
    isPaid: boolean;

}
export class CreateMembreDto extends CreateUserDto {
    role: string
    roleInClub?: string


    club: CreatePaiementClub[]
    event: CreatePaiementEvent[]
    commentaire: Types.ObjectId[]


}
