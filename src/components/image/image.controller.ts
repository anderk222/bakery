import { prisma } from '@/config/';
import { Res, Req, Next, Paginable } from '@/types';
import { getPaginable } from '@/utils';
import { Image, ImageDTO } from './index';


export const getMany = async (req: Req, res: Res<Paginable<Image>>, next: Next) => {

    try {


        const { skip, limit, page } = getPaginable(req);

        const count = await prisma.image.count();

        const results = await prisma.image.findMany({ take: limit, skip });

        const data: Paginable<Image> = { results, info: { count, limit, page } };

        return res.status(200).json({ data });

    } catch (err) {

        return next(err)

    }

};

export const get = async (req: Req, res: Res<Image>, next: Next) => {

    try {

        const id = parseInt(req.params.id);


        if (!id || id < 0  ) return next(new Error('400?=param id must be a number'));

        const data = await prisma.image.findFirst({ where: { id } });

        if (!data) return next(`image with id ${id} not exist`);

        return res.status(200).json({ data });

    } catch (err) {

        return next(err)

    }

};

export const byProduct = async (req: Req, res: Res<Paginable<Image>>, next: Next) => {

    try {

        const id = parseInt(req.params.id);

        const { skip, limit, page } = getPaginable(req);

        if (!id || id < 0  ) return next(new Error('400?=bread box param must be present'));

        const count = await prisma.image.count({ where: { id } });

        const results = await prisma.image.findMany({ where: { id }, take: limit, skip });

        const data: Paginable<Image> = { results, info: { count, limit, page } };;


        return res.status(200).json({ data });


    } catch (err) {

        return next(err)

    }

};

export const create = async (req: Req, res: Res<Image>, next: Next) => {

    try {

        const body = req.body as ImageDTO;

        const data = await prisma.image.create({ data: { ...body, breadBook: { connect: body.breadBook } } });

        return res.status(201).json({ data });

    } catch (err) {

        return next(err)
 
    }

};

export const update = async (req: Req, res: Res<Image>, next: Next) => {

    try {

        const id = parseInt(req.params.id);
        const body = req.body as ImageDTO;

        if (!id || id < 0  ) return next(new Error('400?=id must be a number'));

        const exist = await prisma.image.count({ where: { id } });

        if (!exist) return next(new Error('404?=image dont exist'));

        const data = await prisma.image.update({ where: { id }, data: { ...body, breadBook : { connect : { id : body.breadBook.id } } } });

        return res.status(200).json({ data });

    } catch (err) {

        return next(err)

    }
};

export const remove = async (req: Req, res: Res<Image>, next: Next) => {

    try {

        const id = parseInt(req.params.id);

        if (!id || id < 0  ) return next(new Error('400?=param id must be a number'));

        const exist = await prisma.image.count({ where: { id } });

        if (!exist) return next(new Error('404?=image dont exist'));

        const data = await prisma.image.delete({ where: { id } });


        return res.status(200).json({ data });

    } catch (err) {

        return next(err)

    }

};
