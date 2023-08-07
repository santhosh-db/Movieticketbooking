const {statusCodes}=require("../config")
class Response {
  // triggering a success response
  success(req, res, status, data, message) {
    data = data || undefined;
    message = message ? message : "success";
    //this.createLogs({ status, req, data, message })
    let response = {
      status,
      message,
      data
    };

    return res.status(status).json(response);
  }

  // triggering a error response
  errors(req, res, status, data, message) {
    console.log("Sending Error Response");
    let response = {
      status,
      message,
      data: data || undefined
    };

    return res.status(status).json(response);
  }

// triggering a joi error response
  joicustomerrors(req, res, err) {
    let error = err.details.reduce((prev, curr) => {
      return curr.message.replace(/"/g, "");
    }, {});
    let message = "Bad Request"; 
    let status = statusCodes.HTTP_BAD_REQUEST;
    return res.status(status).json({
      status,
      message,
      error
    });
  }
}

// exporting the module
module.exports = new Response();
