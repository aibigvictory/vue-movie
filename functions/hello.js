exports.handler = async function(event, context) {
    return {
        statusCode : 200,
        body : JSON.stringify({
            name : 'HEROPY',
            age : 85,
            email : 'web.design.big.victory@gmail.com'
        })
    }
}