import { prisma } from '@/config/';
import { Res, Req, Next, Paginable } from '@/types';
import { getPaginable } from '@/utils';
import { CatalogueDTO } from './catalogue.dto';

export const getMany = async (req: Req, res: Res<Paginable<any>>, next: Next) => {

    try {

        const { skip, limit, page } = getPaginable(req);

        const count = await prisma.catalogue.count();

        const results = await prisma.catalogue.findMany({ take: limit, skip });

        const data: Paginable<any> = { results, info: { count, limit, page } };

        return res.status(200).json({ data });

    } catch (err) {

        return next(err)


    }

};

export const get = async (req: Req, res: Res<any>, next: Next) => {

    try {

        const id = parseInt(req.params.id);

        const { skip, limit, page } = getPaginable(req);

        if (!id || id < 0  ) return next(new Error('400?=param id must be a number'));

        const data = await prisma.catalogue.findFirst({ where: { id } });

        if (!data) return next(new Error(`400?=catalogue with id ${id} not exist`));

        return res.status(200).json({ data });

    } catch (err) {

        return next(err)

    }

};

export const byType = async (req: Req, res: Res<Paginable<any>>, next: Next) => {

    try {

        const { type } = req.params;

        const { skip, limit, page } = getPaginable(req);

        if (!type) return next(new Error('400?=type param must be present'));

        const count = await prisma.catalogue.count({ where: { type } });

        const results = await prisma.catalogue.findMany({ where: { type }, take: limit, skip });

        const data: Paginable<any> = { info: { limit, page, count }, results };

        return res.status(200).json({ data });


    } catch (err) {

        return next(err)

    }

};

export const create = async (req: Req, res: Res<any>, next: Next) => {

    try {

        const body = req.body as CatalogueDTO;

        const data = await prisma.catalogue.create({ data: body });

        return res.status(201).json({ data });

    } catch (err) {

        return next(err)

    }

};

export const update = async (req: Req, res: Res<any>, next: Next) => {

    try {

        const id = parseInt(req.params.id);
        const body = req.body as CatalogueDTO;

        if (!id || id < 0  ) return next(new Error('400?=id must be a number'));

        const exist = await prisma.catalogue.count({ where: { id } });

        if (!exist) return next(new Error('404?=catalogue dont exist'));

        const data = await prisma.catalogue.update({ where: { id }, data: body });

        return res.status(200).json({ data });

    } catch (err) {

        return next(err)

    }
};

export const remove = async (req: Req, res: Res<any>, next: Next) => {

    try {

        const id = parseInt(req.params.id);

        if (!id || id < 0  ) return next(new Error('400?=param id must be a number'));

        const exist = await prisma.catalogue.count({ where: { id } });

        if (!exist) return next(`catalogue with id ${id} not exist`);

        const data = await prisma.catalogue.delete({ where: { id } });

        return res.status(200).json({ data });

    } catch (err) {

        return next(err)

    }

};

