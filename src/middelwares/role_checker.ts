import { Next, Req, Res, ResError } from "@/types";
import { Role } from "@prisma/client";
import { prisma } from "@/config";

export function has_role(...roles: Role[]) {

    return async function (req: Req, res: ResError, next: Next) {

        return next(); 
 
     /*    const authorization = req.get('user-id');
 
        if (!authorization ) return res.status(400)
            .json({ message: `nececitas poner el header user-id con el id del usuario` });

        const id = parseInt(authorization);  

        if (!authorization || isNaN(id)) return res.status(400)
            .json({ message: `el id del usuario debe ser un numero y mayor a cero` });

        const user = await prisma.user.findFirst({ where: { id } });

        if (!user) return res.status(400)
            .json({ message: `datos incorrectos` });

        const access = roles.some((r) => (user.role == r || user.role === Role.ADMIN));

        if (!access) return res.status(400)
            .json({ message: `No tienes acceso` });

        next();
*/ 
    } 

};