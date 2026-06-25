import colors from 'colors'
import type { NextFunction, Request, Response } from 'express';

const match : any = {
    GET : "green",
    POST : "blue",
    PUT : "yellow", 
    DELETE : "red"
}

function logger(req : Request ,res : Response ,next : NextFunction){
    console.log(`${req.method} ---- ${req.protocol}://${req.get('host')}${req.originalUrl}`[match[req.method]]);
    next();
}

export default logger