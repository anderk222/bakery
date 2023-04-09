import { prisma } from '@/config/';
import { Res, Req, Next, Paginable } from '@/types';
import { getPaginable } from '@/utils';
import { BreadBook, BreadBookDTO } from './index';


export const getMany = async (req: Req, res: Res<Paginable<BreadBook>>, next: Next) => {

    try {

        const { skip, limit, page } = getPaginable(req);

        const count = await prisma.breadBook.count();

        const results = await prisma.breadBook.findMany({
            take: limit, skip, include: { images: true }
        });

        const data: Paginable<BreadBook> = { results, info: { count, limit, page } };

        return res.status(200).json({ data });

    } catch (err) {

        return next(err)

    }

};

export const get = async (req: Req, res: Res<BreadBook>, next: Next) => {

    try {

        const id = parseInt(req.params.id);

        if (!id || id < 0  ) return next(new Error('400?=param id must be a number'));

        const data = await prisma.breadBook.findFirst({ where: { id }, include: { images: true } });

        if (!data) return next(new Error(`breadBook with id ${id} not exist`));

        return res.status(200).json({ data });

    } catch (err) {

        return next(err)

    }

};



export const create = async (req: Req, res: Res<BreadBook>, next: Next) => {

    try {

        const body = req.body as BreadBookDTO;

        if(body?.images?.length ){ 
            console.log('entre\n\n\n\n\n $',body.images.length);
            
            body.images = body.images.length > 10  ? body.images.slice(0,10) : body.images
        }

        

        const data = await prisma.breadBook.create(
            { data: { ...body, images: { create: body.images } }, include: { images: true } });

        return res.status(201).json({ data });

    } catch (err) {

        return next(err)

    }

};

export const update = async (req: Req, res: Res<BreadBook>, next: Next) => {

    try {

        const id = parseInt(req.params.id);
        const body = req.body as BreadBook;

        if (!id || id < 0  ) return next(new Error('400?=id must be a number'));

        if(body.images.length === 10) body.images = body.images.slice(0,10);

        const exist = await prisma.breadBook.findFirst({ where: { id }, include: { images: true } });

        if (!exist) return next(new Error('404?=bread box dont exist'));

        for (let v of exist.images) {
            let exist = body.images.some((_v) => v.id == _v.id);

            if (!exist) {
                await prisma.image.delete({ where: { id: v.id } });
                continue;
            };

            body.images = body.images.filter((image=>v.id != image.id))

        }

        const createImages = body.images.map((v) => {

            return { url: v.url };

        });

        const data = await prisma.breadBook.update({
            where: { id },
            data: { ...body, images: { create: createImages } }, include: { images: true }
        });

        return res.status(200).json({ data });

    } catch (err) {

        return next(err)

    }
};
export const remove = async (req: Req, res: Res<BreadBook>, next: Next) => {

    try {

        const id = parseInt(req.params.id);

        if (!id || id < 0  ) return next(new Error('400?=param id must be a number'));

        const exist = await prisma.breadBook.count({ where: { id } });

        if (!exist) return next(new Error(`404?=bread box with id ${id} not exist`));

        const data = await prisma.breadBook.delete({ where: { id }, include: { images: true } });

        return res.status(200).json({ data });

    } catch (err) {

        return next(err)

    }

};
