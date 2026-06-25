import { readFileSync, writeFileSync } from "node:fs";
import type { dataType } from "./createPincodeMap.js";
import type { Request, Response } from "express";
import path from "node:path";
import { sendSuccessResponse } from "./response.js";

type city_pincode = {
    pincode : number,
    office_name : string,
    state : string,
    delivery : "Delivery" | "Non Delivery",
    latitude : number,
    longitude : number
}

let city_map = new Map<string, city_pincode[]>();

export const filePath = path.resolve(
    "../pincode_app/src/data/data.json"
);

export function create_city_map(req : Request, res : Response){
    const raw = readFileSync(filePath, "utf-8");

    const data : dataType[] = JSON.parse(raw);

    for(let i of data){
        let value : city_pincode = {
            pincode : i.pincode,
            office_name : i.officename,
            state : i.statename,
            delivery : i.delivery,
            latitude :  i.latitude,
            longitude : i.longitude
        }

        let key : string = i.district;

        let arr = city_map.get(key);
        
        if(!arr){
            city_map.set(key, [value]);
        }
        else{
            city_map.get(key)?.push(value);
        }
    }

    const new_city = JSON.stringify(Object.fromEntries(city_map), null, 2);
    writeFileSync("../pincode_app/src/data/cityMap.json", new_city);
    console.log("File Created");
    res.send(sendSuccessResponse({"message" : "File Created"}))
}