import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as argon2 from "argon2"
import { Document } from "mongoose";

@Schema({discriminatorKey:'role'})
export class User extends Document {
    
    @Prop()
    nom: string

    @Prop()
    prenom: string
    @Prop({ required: true })
    email: string
    @Prop()
    password: string
    @Prop()
    dateNaissance:Date
    @Prop()
    telephone: number
    @Prop()
    adresse:string
    @Prop()
    faculte : string
    @Prop()
    sexe : string
    
    @Prop()
    origine : string
    @Prop()
    image : string
 
    @Prop()
    refreshToken: string
    @Prop({ type: String, default: null})   
    code: string | null; 
    @Prop({ default: false }) 
    verifyEmail: boolean;

}

export const userSchema = SchemaFactory.createForClass(User)

