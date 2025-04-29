import { Types } from "mongoose";
import { CreateUserDto } from "src/user/dto/create-user.dto";

export class CreateMembreDto extends CreateUserDto {
    role:string
    club: Types.ObjectId[] 
}
