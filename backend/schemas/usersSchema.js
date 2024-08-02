import mongoose from "mongoose";
import Joi from "joi";

const usersSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    images: {
        type: Array,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    budget: {
        type: Number,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
});

export const Users = mongoose.model("Users", usersSchema);

export const validationUser = (body) => {
    const schema = Joi.object({
        fname: Joi.string().required(),
        lname: Joi.string().required(),
        images: Joi.array().required(),
        username: Joi.string().required(),
        password: Joi.string().required(),
        gender: Joi.string().required(),
        budget: Joi.number().required(),
        age: Joi.number().required(),
        isActive: Joi.boolean()
    });
    return schema.validate(body);
};
