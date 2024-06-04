const mongoose = require('mongoose')

const connect = async () => {
    try {
        await mongoose.connect(`link connect`)
        console.log('database connect successfull!')
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = connect;