function checkPincode(pincode : string ) : boolean {
    const pattern = new RegExp(/^[1-9]\d{5}$/)
    
    return pattern.test(pincode);
}

export default checkPincode;