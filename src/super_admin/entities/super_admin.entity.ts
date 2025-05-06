import { Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "src/user/entities/user.entity";
@Schema()
export class SuperAdmin  extends User{
    role:string
}
export const superAdminSchema=SchemaFactory.createForClass(SuperAdmin)
