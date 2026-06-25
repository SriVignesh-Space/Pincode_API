import type { Request, Response } from "express";
import data from "../data/pincodeMap.json" with {type : "json"};
import type { new_pincode_data_type } from "../util/createPincodeMap.js";
import { sendFailureResponse, sendSuccessResponse } from "../util/response.js";
import checkPincode from "../util/checkPincode.js";


const pincodeMap = new Map<string, new_pincode_data_type>(Object.entries(data));

type validResponse = {
    pincode : string,
    exists : boolean,
    circlename : string,
    regionname : string,
    divisionname : string
}

type Params = {
  id: string
};

type bulkLookupBody = {
    pincodes : string[]
}

export const getPincode = (req : Request<Params>, res : Response) => {
    const { id }= req.params;

    if(checkPincode(id) == false){
        return res.status(400).json(sendFailureResponse({ message: "Invalid pincode" }));
    }
    if(pincodeMap.has(id))
        return res.status(200).json(sendSuccessResponse(pincodeMap.get(id)));
    return res.status(404).json(sendFailureResponse({message : "pincode not found"}));
}


export const validatePincode = (req : Request<Params>, res : Response) => {
    const {id} = req.params;

    if(checkPincode(id) == false){
        return res.status(400).json(sendFailureResponse({ message: "Invalid pincode" }));
    }

    const data = pincodeMap.get(id);
    if (!data) {
            return res.status(404).json(
                sendFailureResponse({ message: "pincode not found" })
            );
            }
    else{
        const resp : validResponse = {
            pincode : data.pincode,
            exists : true,
            circlename : data.circlename,
            regionname : data.regionname,
            divisionname : data.divisionname
        }
        return res.status(200).send(sendSuccessResponse(resp))
    }
}

export const bulkLookup = (req : Request<{},{},bulkLookupBody>, res : Response) => {
    const {pincodes}= req.body;
    
    const data : new_pincode_data_type[] = [];

    for(const code of pincodes){
        if(checkPincode(code) == false ) continue;
        const info = pincodeMap.get(code);
        if(pincodeMap.has(code) && info){
            data.push(info);
        }
    }

    return res.send(sendSuccessResponse({
        requested : pincodes.length,
        found : data.length,
        not_found : pincodes.length - data.length,
        results : data
    }))
}

// add pagination and sorting ( if possible)
export const AllPincode   = (req : Request, res : Response) => {
    const keys = Array.from(pincodeMap.keys());
    return res.status(200).send(sendSuccessResponse({data : keys }))
}