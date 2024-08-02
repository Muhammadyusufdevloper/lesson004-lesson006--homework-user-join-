import express from 'express';
import { Users, validationUser } from '../schemas/usersSchema.js';
const router = express.Router();

function ReturnInformation(msg, variant, payload) {
    return {
        msg,
        variant,
        payload
    };
}

router.get("/", async (req, res) => {
    try {
        const { limit, page } = req.query;
        const user = await Users.find().limit(limit).skip((page - 1) * limit);
        const total = await Users.countDocuments();
        if (!user.length) {
            return res.status(400).json(ReturnInformation("Users is not defined", "error", null));
        }
        res.status(200).json({
            ...ReturnInformation("All Users", "success", user),
            total: total,
        });
    } catch {
        res.status(500).json(ReturnInformation("Server error", "error", null));
    }
});

router.post("/", async (req, res) => {
    try {
        let { error } = validationUser(req.body)
        if (error) {
            return res.status(400).json(ReturnInformation(error.details[0].message, "error", null));
        }
        const existUser = await Users.exists({ username: req.body.username });

        if (existUser) {
            return res.status(400).json(ReturnInformation("User already exists", "warning", null));
        }
        const user = await Users.create(req.body);

        res.status(201).json(ReturnInformation("User created", "success", user));
    } catch (error) {
        console.error(error);
        res.status(500).json(ReturnInformation("Server error", "error", null));
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const existUser = await Users.findById(id);
        if (!existUser) {
            return res.status(400).json(ReturnInformation("User is not defined", "warning", null));
        }

        const user = await Users.findByIdAndDelete(id);

        res.status(200).json(ReturnInformation("User deleted", "success", user));
    } catch {
        res.status(500).json(ReturnInformation("Server error", "error", null));
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const user = await Users.findByIdAndUpdate(id, req.body, { new: true });

        res.status(200).json(ReturnInformation("User updated", "success", user));
    } catch {
        res.status(500).json(ReturnInformation("Server error", "error", null));
    }
});

export default router;
