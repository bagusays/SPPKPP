function json(result, status) {
    return { status: status || 200, result: result }
}

module.exports = json;