import { Role } from "@prisma/client"

export type userDTO = {
    name : string
    email : string
    phone : string,
    role : Role
}