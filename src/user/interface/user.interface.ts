import { Document } from "mongoose";

export interface IUser extends Document {
    readonly nom: string
    readonly prenom: string
    readonly email: string
     password: string
    readonly dateNaissance: Date
    readonly telephone: number
    readonly adresse: string
    readonly faculte: string
    readonly sexe: string
    readonly origine: string
    image: string
    refreshToken: string 
    code: string | null
    verifyEmail: boolean
}