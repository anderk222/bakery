import { prisma } from '@/config/';
import { Res, Req, Next, Paginable } from '@/types';
import { getPaginable } from '@/utils';
import { userDTO, Role, User } from './index';


export const getMany = async (req: Req, res: Res<Paginable<User>>, next: Next) => {

    try {

        const { skip, limit, page } = getPaginable(req);

        const count = await prisma.user.count();

        const results = await prisma.user.findMany({ take: limit, skip });

        const data: Paginable<User> = { results, info: { limit, page, count } };

        return res.status(200).json({ data });

    } catch (err) {

        console.log(err);

        return next(err)

    }

};

export const get = async (req: Req, res: Res<User>, next: Next) => {

    try {

        const id = parseInt(req.params.id);

        const { skip, limit, page } = getPaginable(req);

        if (!id || id < 0  ) return next(new Error('400?=id param must be a number'));

        const data = await prisma.user.findFirst({ where: { id } });

        if (!data) return next(new Error(`404?=user with id ${id} not exist`));

        return res.status(200).json({ data });

    } catch (err) {

        return next(err)

    }

};

export const byRole = async (req: Req, res: Res<Paginable<User>>, next: Next) => {

    try {

        const role = req.params.role as Role;

        const { skip, limit, page } = getPaginable(req);

        if (!role) return next(new Error('400?=role param must be present'));

        const count = await prisma.user.count({ where: { role } });


        const results = await prisma.user.findMany({ where: { role }, take: limit, skip });

        const data: Paginable<User> = { results, info: { limit, page, count } };

        return res.status(200).json({ data });


    } catch (err) {

        return next(err)

    }

};

export const create = async (req: Req, res: Res<User>, next: Next) => {

    try {

        const body = req.body as userDTO;

        const data = await prisma.user.create({ data: body });

        return res.status(201).json({ data });

    } catch (err) {

        return next(err)

    }

};

export const update = async (req: Req, res: Res<User>, next: Next) => {

    try {

        const id = parseInt(req.params.id);
        const body = req.body as userDTO;

        if (!id || id < 0  ) return next(new Error('400?=id must be a number'));

        const exist = await prisma.user.count({ where: { id } });

        if (!exist) return next(new Error('404?=user dont exist'));

        const data = await prisma.user.update({ where: { id }, data: body });

        return res.status(200).json({ data });

    } catch (err) {

        return next(err)

    }
};

export const remove = async (req: Req, res: Res<User>, next: Next) => {

    try {

        const id = parseInt(req.params.id);

        if (!id || id < 0  ) return next(new Error('400?=param id must be a number'));

        const exists = await prisma.user.count({ where: { id } });

        if (!exists) return next(new Error(`404?=user with id ${id} not exist`));

        const data = await prisma.user.delete({ where: { id } });

        return res.status(200).json({ data });

    } catch (err) {

        return next(err)

    }

};
