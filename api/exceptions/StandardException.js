class StandardException extends require('./AppError'){
    constructor (message){
        super(message|| 'IotService Error', 400)
    }
}
module.exports = StandardException;