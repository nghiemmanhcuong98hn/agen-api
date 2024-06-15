const Joi = require('joi');
const messages = require('../configs/messages');


const listUser = {
    query:Joi.object().keys({
        name:Joi.string(),
        email:Joi.string(),
        createdAt:Joi.date(),
        phone:Joi.string(),
    })
}

module.exports = {
    listUser
}