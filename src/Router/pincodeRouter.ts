import { Router } from "express";
import { AllPincode, bulkLookup, getPincode, validatePincode } from "../Controller/pincodeController.js";


const pincodeRouter : Router = Router();

pincodeRouter.get("/getAllPincode", AllPincode);

pincodeRouter.get("/:id/validate", validatePincode)

pincodeRouter.get("/:id", getPincode);

pincodeRouter.post("/bulklookup", bulkLookup);

export default pincodeRouter;