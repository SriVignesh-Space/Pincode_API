import xlsx, { type WorkSheet } from 'xlsx';
import fs from 'fs/promises'

export default async function convert(){
    const workbook = xlsx.readFile("pincode.csv");
    
    const sheetName : string | undefined = workbook.SheetNames[0];

    if(!sheetName){
        console.log("sheetName can't defined");
        return;
    }

    const sheet : WorkSheet | undefined = workbook.Sheets[sheetName];   
    if(!sheet) return;

    const data = xlsx.utils.sheet_to_json(sheet);

    fs.writeFile("data.json", JSON.stringify(data, null, 2));

    console.log("exported as json");
}