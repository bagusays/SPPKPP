function json(param) {
    const { status, message, result } = param
    return { 
        message,
        status: status || 200, 
        result
    }
}

module.exports = json;