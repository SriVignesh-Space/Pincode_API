import type { NextFunction, Request, Response } from "express";
import { sendFailureResponse } from "../util/response.js";

function authenticate(req : Request, res : Response, next : NextFunction){
    if(!req.headers["x-rapidapi-key"]){
        return res.status(401).send(sendFailureResponse({message : "unauthorized access"}));
    }
    next();
}

export default authenticate;