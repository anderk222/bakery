import { prisma } from '@/config/';
import { Res, Req, Next, Paginable } from '@/types';
import { getPaginable } from '@/utils';
import { Order, OrderDTO, OrderUpdate } from './index';


export const getMany = async (req: Req, res: Res<Paginable<Order>>, next: Next) => {

    try {

        const { skip, limit, page } = getPaginable(req);

        const count = await prisma.breadBookOnOrders.count();

        const results = await prisma.order.findMany(
            {
                take: limit, skip
                , include: { typePagement: true, client: true, products: { include: { product: true } } }
            });

        const data: Paginable<Order> = { results, info: { count, limit, page } };

        return res.status(200).json({ data });

    } catch (err) {

        return next(err)
    }

};

export const get = async (req: Req, res: Res<Order>, next: Next) => {

    try {

        const id = parseInt(req.params.id);

        if (!id || id < 0) return next(new Error('400?=param id must be a number'));


        const data = await prisma.order.findFirst(
            { where: { id }, include: { typePagement: true, client: true, products: { include: { product: true } } } });

        if (!data) return next(new Error('404?=order not found'))

        return res.status(200).json({ data });

    } catch (err) {
        console.log(err);


        return next(err)

    }

};

export const create = async (req: Req, res: Res<Order>, next: Next) => {

    try {

        let errors = '';
        let total = 0;

        const body = req.body as OrderDTO;

        const order = await prisma.order.create({
            data: {
                total: 0, clientId: body.clientId, typePagementId: body.typePagementId
            }
        });


        for (let product of body.products) {

            const exist = await prisma.breadBook.findFirst({ where: { id: product.id } });

            if (!exist) {
                errors += `dont exist product with id ${product.id}\n`
                continue;
            }

            const amount = !product.amount ? 1 : product.amount;

            const bread_book = await prisma.breadBookOnOrders.create(
                { data: { amount, productId: exist.id, orderId: order.id } });

            total += exist.price * amount;


        }

        const data = await prisma.order.update({
            where: { id: order.id }, data: { total }
            , include: { typePagement: true, client: true, products: { include: { product: true } } }
        })

        return res.status(201).json({ data, message: errors });

    } catch (err) {
        console.error(err);


        return next(err)

    }

};

export const update = async (req: Req, res: Res<Order>, next: Next) => {

    try {

        const id = parseInt(req.params.id);
        let body = req.body as OrderUpdate;

        body.products = body?.products ? body.products : [];

        if (!id || id < 0) return next(new Error('400?=id must be a number'));

        const exist = await prisma.order.findFirst(
            { where: { id }, include: { products: { include: { product: true } } } });

        if (!exist) return next(new Error('404?=bread box dont exist'));


        const upsert = [...body.products].map((v) => {

            return {
                where: {
                    orderId_productId: { orderId: exist.id, productId: v.id },
                },
                create: { amount: v.amount, productId: v.id }, update: { amount: v.amount, productId: v.id }

            }

        });


        const update = await prisma.order.update(
            {
                where: { id }, data: { ...body, products: { upsert: upsert } },
                include: { typePagement: true, client: true, products: { include: { product: true } } }
            });

        let total = 0;

        for (let product of update.products) {
            const amount = !product.amount ? 1 : product.amount;
            total += product.product.price * amount;

        }
        const data = await prisma.order.update({
            where: { id }, data: { total },
            include: { typePagement: true, client: true, products: { include: { product: true } } }
        })

        return res.status(200).json({ data });

    } catch (err) {

        return next(err)

    }
};

export const remove = async (req: Req, res: Res<Order>, next: Next) => {

    try {

        const id = parseInt(req.params.id);

        if (!id || id < 0) return next(new Error('400?=param id must be a number'));

        const exist = await prisma.order.count({ where: { id } });

        if (!exist) return next(new Error(`404?=bread box with id ${id} not exist`));

        const data = await prisma.order.delete({
            where: { id },
            include: { typePagement: true, client: true, products: { include: { product: true } } }
        })

        return res.status(200).json({ data });

    } catch (err) {

        return next(err)

    }

};
