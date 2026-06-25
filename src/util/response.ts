function sendSuccessResponse(data : any){
    const resp = {
        success : true,
        data : data
    }
    return resp;
}

function sendFailureResponse(data : any){
    const resp ={
        success : false,
        error : data
    }
    return resp;
}

export {sendSuccessResponse, sendFailureResponse};