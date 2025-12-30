class ApiResponse {
    constructor(status, data , message = null) {
        this.status = status;
        this.data = data;
        this.message = message;
        this.success = status<400;
    }
}

export default ApiResponse;


