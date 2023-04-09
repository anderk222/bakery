import { Req, Next, ResError } from '@/types';

export function error_handler(err: Error, req: Req, res: ResError, next: Next) {

    try {

        const array = err.message.split('?=');

        console.log(array);
        

        if (array.length !== 2) return res.status(500).json({ message: 'uknown error' })

        const parseStatus = parseInt(array[0]);

        const status = !parseStatus ? 500 : parseStatus;

        res.status(status).json({ message: array[1] });

    } catch (err) {

        res.status(500).json({ message: 'uknown error' })
    }

}