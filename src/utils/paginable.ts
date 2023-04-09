import { Req } from "@/types";

function getPaginable (req : Req) : paginable { 

  const page = req.query.page ? parseInt(req.query.page.toString())  : 0;
  const limit = req.query.limit ? parseInt(req.query.limit.toString()) : 10;

  const skip = page > 0 && limit >  0 ? page * limit : 0;

  return { limit, page, skip };
}

type paginable = { limit : number, page : number, skip : number};


export { getPaginable };