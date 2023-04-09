import { Response } from "express";

type ResponseContent<T> = Response<{ success? : boolean, message? : string, data? : T }>;
type ResError = Response<{ message? : string }>;

export { Request as Req } from 'express';
export { NextFunction as Next } from 'express';

export type { ResponseContent as Res, ResError };