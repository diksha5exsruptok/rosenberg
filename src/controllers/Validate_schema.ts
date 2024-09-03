import Joi from "joi";

// const Joi = require('joi');

const createProjectSchema = Joi.object({
    projectTitle: Joi.string().required()

})

const createScanSchema = Joi.object({
    scanTitle: Joi.string().required(),
    // scanDoc: Joi.string().required()
})

export default {
    createProjectSchema,
    createScanSchema
}




