const send_response = (res, response_obj) =>{
    if(!response_obj){
        return res.status(500).json({
            error: true,
            message: "Internal Server Error",
            data: null
        });
    }

    return res.status(response_obj.status_code).json({
        error: response_obj.error,
        message: response_obj.message,
        data: response_obj.data
    });
}

module.exports = send_response;