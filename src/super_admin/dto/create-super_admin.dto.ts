import { CreateUserDto } from "src/user/dto/create-user.dto";

export class CreateSuperAdminDto extends CreateUserDto{
    role:string
}
