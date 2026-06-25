import express, { type Response } from 'express'
import logger from './middleware/logger.js';
import authenticate from './middleware/auth.js';
import { sendFailureResponse, sendSuccessResponse } from './util/response.js';
import createPincodeMap from './util/createPincodeMap.js';
import pincodeRouter from './Router/pincodeRouter.js';

const app = express();

app.use(logger)
app.use(express.json())
// app.use(authenticate)     // enable before production

app.get("/health", (_ : any, res : Response) => {
    res.send(sendSuccessResponse({message : "Hello, I am fine!"}));
})

app.use("/pincode", pincodeRouter)


app.listen(3000,() => {
    console.log("server on port 3000");
})

