import { readFileSync, writeFileSync } from "fs";

type office = {
    officename : string,
    officetype : string,
    delivery : boolean,
    district : string,
    state : string,
    latitude : number | null,
    longitude : number | null
}

export type new_pincode_data_type = {
    circlename : string,
    regionname: string,
    divisionname : string,
    pincode : string,
    offices : office[]
}

export type dataType = {
    circlename: string,
    regionname: string,
    divisionname: string,
    officename: string,
    pincode: number,
    officetype: string,
    delivery: "Delivery" | "Non Delivery",
    district: string,
    statename: string,
    latitude: number,
    longitude: number
}

function createPincodeMap(){
    const raw = readFileSync("../ScrapingTS/src/data/data.json", "utf-8");
    const data : dataType[] = JSON.parse(raw);

    const mp = new Map<number, new_pincode_data_type>();
    
    data.forEach((item) => {
        if(!mp.has(item.pincode)){
            const new_off_data : new_pincode_data_type  = {
                circlename : item.circlename,
                regionname : item.regionname,
                divisionname : item.divisionname,
                pincode : String(item.pincode),
                offices : []
            }
            mp.set(item.pincode, new_off_data);

        }
        
        const off_data : office = {
            officename : item.officename,
            officetype : item.officetype,
            delivery : item.delivery === "Delivery",
            district : item.district,
            state : item.statename,
            latitude : Number(item.latitude),
            longitude : Number(item.longitude) 
        }

        mp.get(item.pincode)!.offices.push(off_data);
    });

    const new_data = JSON.stringify(Object.fromEntries(mp), null, 2);
    writeFileSync("../ScrapingTS/src/data/pincodeMap.json", new_data);
    console.log("pincode map created successfully")
}

export default createPincodeMap;